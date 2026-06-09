const fs = require('fs');
let code = fs.readFileSync('app/page.js', 'utf8');

const heroComponentDef = `
// --- NEW HERO SECTION --- //
const SplitTextWrapper = ({ text, type = "words", addFirstCharClass = false }) => {
  if (type === "words") {
    return text.split(" ").map((word, wIdx) => (
      <span key={wIdx} className="word inline-block relative overflow-hidden" style={{ marginRight: '0.25em' }}>
        <span className="inline-block translate-y-full will-change-transform">{word}</span>
      </span>
    ));
  } else if (type === "words, chars") {
    return text.split(" ").map((word, wIdx) => (
      <span key={wIdx} className="word inline-block" style={{ marginRight: '0.25em' }}>
        {word.split("").map((char, cIdx) => (
          <span key={cIdx} className={\`char inline-block relative overflow-hidden \${addFirstCharClass && wIdx === 0 && cIdx === 0 ? 'first-char origin-top-left' : ''}\`} style={{ marginTop: '0.75rem' }}>
            <span className="inline-block -translate-y-full will-change-transform">{char}</span>
          </span>
        ))}
      </span>
    ));
  }
};

const HeroSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!gsap.parseEase("hop")) {
        CustomEase.create("hop", ".8, 0, .3, 1");
      }

      const isMobile = window.innerWidth <= 1000;

      gsap.set(
        [
          ".split-overlay .intro-title .first-char span",
          ".split-overlay .outro-title .char span",
        ],
        { y: "0%" }
      );

      gsap.set(".split-overlay .intro-title .first-char", {
        x: isMobile ? "7.5rem" : "18rem",
        y: isMobile ? "-1rem" : "-2.75rem",
        fontWeight: "900",
        scale: 0.75,
      });

      gsap.set(".split-overlay .outro-title .char", {
        x: isMobile ? "-3rem" : "-8rem",
        fontSize: isMobile ? "6rem" : "14rem",
        fontWeight: "500",
      });

      const tl = gsap.timeline({ defaults: { ease: "hop" } });
      const tags = gsap.utils.toArray(".tag");

      tags.forEach((tag, index) => {
        tl.to(
          tag.querySelectorAll(".word span"),
          {
            y: "0%",
            duration: 0.75,
          },
          0.5 + index * 0.1
        );
      });

      tl.to(
        ".preloader .intro-title .char span",
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.05,
        },
        0.5
      )
        .to(
          ".preloader .intro-title .char:not(.first-char) span",
          {
            y: "100%",
            duration: 0.75,
            stagger: 0.05,
          },
          2
        )
        .to(
          ".preloader .outro-title .char span",
          {
            y: "0%",
            duration: 0.75,
            stagger: 0.075,
          },
          2.5
        )
        .to(
          ".preloader .intro-title .first-char",
          {
            x: isMobile ? "9rem" : "21.25rem",
            duration: 1,
          },
          3.5
        )
        .to(
          ".preloader .outro-title .char",
          {
            x: isMobile ? "-3rem" : "-8rem",
            duration: 1,
          },
          3.5
        )
        .to(
          ".preloader .intro-title .first-char",
          {
            x: isMobile ? "7.5rem" : "18rem",
            y: isMobile ? "-1rem" : "-2.75rem",
            fontWeight: "900",
            scale: 0.75,
            duration: 0.75,
          },
          4.5
        )
        .to(
          ".preloader .outro-title .char",
          {
            x: isMobile ? "-3rem" : "-8rem",
            fontSize: isMobile ? "6rem" : "14rem",
            fontWeight: "500",
            duration: 0.75,
            onComplete: () => {
              gsap.set(".preloader", {
                clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
              });
              gsap.set(".split-overlay", {
                clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
              });
            },
          },
          4.5
        )
        .to(
          ".hero-container",
          {
            clipPath: "polygon(0% 48%, 100% 48%, 100% 52%, 0% 52%)",
            duration: 1,
          },
          5
        );

      tags.forEach((tag, index) => {
        tl.to(
          tag.querySelectorAll(".word span"),
          {
            y: "100%",
            duration: 0.75,
          },
          5.5 + index * 0.1
        );
      });

      tl.to(
        [".preloader", ".split-overlay"],
        {
          y: (i) => (i === 0 ? "-50%" : "50%"),
          duration: 1,
        },
        6
      )
        .to(
          ".hero-container",
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
          },
          6
        )
        .to(
          ".hero-container .card",
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.75,
          },
          6.25
        )
        .to(
          ".hero-container .card h1 .char span",
          {
            y: "0%",
            duration: 0.75,
            stagger: 0.05,
          },
          6.5
        )
        .to([".preloader", ".split-overlay", ".tags-overlay"], {
          display: "none"
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative h-screen">
      <div className="preloader">
        <div className="intro-title">
          <h1 className="uppercase text-6xl font-semibold leading-none"><SplitTextWrapper text="Panthers Estate" type="words, chars" addFirstCharClass={true} /></h1>
        </div>
        <div className="outro-title">
          <h1 className="uppercase text-6xl font-semibold leading-none"><SplitTextWrapper text="PE" type="words, chars" /></h1>
        </div>
      </div>
      <div className="split-overlay">
        <div className="intro-title">
          <h1 className="uppercase text-6xl font-semibold leading-none"><SplitTextWrapper text="Panthers Estate" type="words, chars" addFirstCharClass={true} /></h1>
        </div>
        <div className="outro-title">
          <h1 className="uppercase text-6xl font-semibold leading-none"><SplitTextWrapper text="PE" type="words, chars" /></h1>
        </div>
      </div>
      <div className="tags-overlay">
        <div className="tag tag-1 uppercase font-medium"><SplitTextWrapper text="Luxury Living" type="words" /></div>
        <div className="tag tag-2 uppercase font-medium"><SplitTextWrapper text="Modern Architecture" type="words" /></div>
        <div className="tag tag-3 uppercase font-medium"><SplitTextWrapper text="Prime Locations" type="words" /></div>
      </div>
      <div className="hero-container container">
        <nav className="absolute top-0 left-0 w-full z-10 text-white flex justify-between p-8">
          <p id="logo" className="font-semibold text-xl">Panthers</p>
          <p>Menu</p>
        </nav>
        <div className="hero-img absolute w-full h-full inset-0">
          <img src="/realtora-real-estate/public/images/BBK7G2W0GpZei2zukI6jNqEI6X4.jpeg" alt="Panthers Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="card text-black z-10 flex items-center justify-center" style={{ backgroundColor: '#fff', padding: '2rem' }}>
          <h1 className="uppercase text-5xl font-semibold leading-none"><SplitTextWrapper text="Panthers" type="words, chars" addFirstCharClass={true} /></h1>
        </div>
        <footer className="absolute bottom-0 left-0 w-full z-10 text-white flex justify-between p-8">
          <p className="uppercase font-medium text-sm">Scroll Down</p>
        </footer>
      </div>
    </div>
  );
};
// --- END NEW HERO SECTION --- //
`;

// 1. Inject components just before export default function Home()
if (!code.includes('const HeroSection = () => {')) {
  const homeDefIdx = code.indexOf('export default function Home() {');
  code = code.substring(0, homeDefIdx) + heroComponentDef + '\\n' + code.substring(homeDefIdx);
}

// 2. Remove the OLD PRELOADER ONLY. 
const plStart = code.indexOf('{/* 1. Pre-loader Section');
const plEndStr = '</div>\\n      </div>';
const plEnd = code.indexOf(plEndStr, plStart);
if (plStart !== -1 && plEnd !== -1) {
    code = code.substring(0, plStart) + '<HeroSection />\\n' + code.substring(plEnd + plEndStr.length);
}

// 3. Remove the OLD HERO SECTION ONLY.
const hsStart = code.indexOf('{/* 3. Main Hero Website Section Wrapped in Container for Rotation */}');
const aboutStart = code.indexOf('{/* 4. About Us Section (Who Are We) */}');
if (hsStart !== -1 && aboutStart !== -1) {
    // We want to delete <section id="hero" ...> all the way to just before About Us.
    const heroSecStart = code.indexOf('<section id="hero"', hsStart);
    const heroSecEnd = code.lastIndexOf('</section>', aboutStart);
    if (heroSecStart !== -1 && heroSecEnd !== -1) {
        code = code.substring(0, heroSecStart) + code.substring(heroSecEnd + '</section>'.length);
    }
}

// 4. In Home's useEffect, disable the specific tl.to animations that target preLoaderRef and loaderImgRef.
// I will just comment out the whole timeline setup to ensure no errors.
const tlStart = code.indexOf('const tl = gsap.timeline();');
const tlEnd = code.indexOf('// 3. Setup specific ScrollTriggers');
if (tlStart !== -1 && tlEnd !== -1) {
    // We comment out everything between tlStart and tlEnd
    const timelineBlock = code.substring(tlStart, tlEnd);
    const commentedBlock = timelineBlock.split('\\n').map(l => '// ' + l).join('\\n');
    code = code.substring(0, tlStart) + commentedBlock + '\\n    ' + code.substring(tlEnd);
}

// 5. ALSO comment out `tl.kill();` in the return cleanup!
code = code.replace('tl.kill();', '// tl.kill();');

fs.writeFileSync('app/page.js', code, 'utf8');
console.log("Successfully rebuilt Home with EXACT substring replacements.");
