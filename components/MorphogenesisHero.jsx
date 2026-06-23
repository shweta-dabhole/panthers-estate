"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform float uSpread;
  varying vec2 vUv;

  float Hash(vec2 p) {
    vec3 p2 = vec3(p.xy, 1.0);
    return fract(sin(dot(p2, vec3(37.1, 61.7, 12.4))) * 3758.5453123);
  }

  float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f *= f * (3.0 - 2.0 * f);
    return mix(
      mix(Hash(i + vec2(0.0, 0.0)), Hash(i + vec2(1.0, 0.0)), f.x),
      mix(Hash(i + vec2(0.0, 1.0)), Hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    v += noise(p * 1.0) * 0.5;
    v += noise(p * 2.0) * 0.25;
    v += noise(p * 4.0) * 0.125;
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 centeredUv = (uv - 0.5) * vec2(aspect, 1.0);
    
    float dissolveEdge = uv.y - uProgress * 1.2;
    float noiseValue = fbm(centeredUv * 15.0);
    float d = dissolveEdge + noiseValue * uSpread;
    
    float pixelSize = 1.0 / uResolution.y;
    float alpha = 1.0 - smoothstep(-pixelSize, pixelSize, d);
    
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export default function MorphogenesisHero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const headingRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const CONFIG = {
      color: "#F9F9F9", // Matches AboutUs bg
      spread: 0.5,
      speed: 2,
    };

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });

    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255,
          }
        : { r: 0.89, g: 0.89, b: 0.89 };
    }

    function resize() {
      if (!container) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      if (material) {
        material.uniforms.uResolution.value.set(width, height);
      }
    }

    const rgb = hexToRgb(CONFIG.color);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uProgress: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(container.offsetWidth, container.offsetHeight),
        },
        uColor: { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
        uSpread: { value: CONFIG.spread },
      },
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    resize();
    window.addEventListener("resize", resize);

    let scrollProgress = 0;
    let animationFrameId;

    function animate() {
      // Create a smoother interpolation for the progress
      material.uniforms.uProgress.value = gsap.utils.interpolate(
        material.uniforms.uProgress.value,
        scrollProgress,
        0.1
      );
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    lenis.on("scroll", ({ scroll }) => {
      const heroHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = heroHeight - windowHeight;
      if (maxScroll > 0) {
        scrollProgress = Math.min((scroll / maxScroll) * CONFIG.speed, 1.1);
      }
    });

    const words = wordsRef.current;
    gsap.set(words, { opacity: 0 });
    gsap.set(headingRef.current, { opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = Math.max(0, (self.progress - 0.4) * (1 / 0.6));
        const totalWords = words.length;

        if (headingRef.current) {
          gsap.to(headingRef.current, {
            opacity: progress > 0 ? Math.min(1, progress * 5) : 0,
            duration: 0.1,
            overwrite: true,
          });
        }

        words.forEach((word, index) => {
          if (!word) return;
          const wordProgress = index / totalWords;
          const nextWordProgress = (index + 1) / totalWords;

          let opacity = 0;

          if (progress >= nextWordProgress) {
            opacity = 1;
          } else if (progress >= wordProgress) {
            const fadeProgress =
              (progress - wordProgress) / (nextWordProgress - wordProgress);
            opacity = fadeProgress;
          }

          gsap.to(word, {
            opacity: opacity,
            duration: 0.1,
            overwrite: true,
          });
        });
      },
    });

    return () => {
      lenis.destroy();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      st.kill();
    };
  }, []);

  const textToSplit = "At Panthers, we believe a home is more than a space — it is where life’s most meaningful moments unfold. Our mission is to help you discover a residence that reflects your aspirations, values, and vision for the future. With trust, expertise, and attention to every detail, we create experiences that turn property journeys into lasting memories.";
  const words = textToSplit.split(" ");

  return (
    <>
      <section ref={containerRef} className="relative w-full h-[165svh] text-[#fec81d] bg-[#F9F9F9]" style={{ marginBottom: '-25svh' }}>
        {/* Overlay Header */}
        <div className="absolute top-0 left-0 w-full flex justify-between items-center z-[9999] pointer-events-none" style={{ padding: '2rem 4rem', backgroundColor: 'transparent', margin: 0, border: 'none' }}>
          <a href="/" className="pointer-events-auto" style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', color: '#C65A1E', letterSpacing: '1px', textDecoration: 'none' }}>
            PANTHERS
          </a>
          <div 
            onClick={() => {
              if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('panthers:toggleMenu'));
            }}
            className="flex items-center gap-2 pointer-events-auto"
            style={{ cursor: 'pointer', color: '#C65A1E' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </div>
        </div>

        <div className="absolute top-0 w-full h-[110svh]">
          <img src="/assets/new%20villa%205.png" alt="Hero background" className="w-full h-full object-cover object-center" />
        </div>
        <div className="absolute inset-0 h-[100svh] flex flex-col justify-center items-center z-10 pointer-events-none w-full">
          <div className="w-full max-w-[1100px] mx-auto flex flex-col items-center text-center gap-6 px-6 xl:px-0">
            <h1 className="text-5xl md:text-6xl lg:text-[80px] font-normal leading-[1.1] tracking-tight text-white drop-shadow-lg" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
              Where Luxury Meets <br /> Your Vision
            </h1>
            <p className="font-sans text-lg md:text-xl font-normal w-[90%] md:w-[60%] max-w-3xl text-white drop-shadow-md opacity-90">
              We curate luxury residences with integrity, precision, and a deep understanding of what makes a home truly yours.
            </p>
          </div>
        </div>
        <canvas ref={canvasRef} className="absolute bottom-0 w-full h-full pointer-events-none z-20"></canvas>

        <div className="absolute top-[75svh] w-full flex flex-col justify-start items-center text-center z-30 pointer-events-none px-6 pt-12">
          <div ref={textRef} className="flex flex-col items-center text-center max-w-[950px]">
            <h2 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight text-center w-full text-[#111]" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
              Luxury Living, Designed for Life
            </h2>
            <p className="text-xl md:text-[30px] font-normal text-[#191919] leading-[1.5] opacity-85 flex flex-wrap justify-center gap-x-[0.25em]" style={{ marginTop: '80px' }}>
              {words.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => (wordsRef.current[i] = el)}
                  className="inline-block"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>


    </>
  );
}
