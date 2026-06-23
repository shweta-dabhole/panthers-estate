"use client";

import React from "react";
import Link from "next/link";
import FooterSection from "@/components/FooterSection";
import ProjectsStrip from "@/components/ProjectsStrip";
import FullScreenSliderCinema from "@/components/FullScreenSliderCinema";
import MenuOverlay from "@/components/MenuOverlay";

export default function ProcessPage() {
  return (
    <div className="bg-white">
      <MenuOverlay isBlackText={false} />
      <FullScreenSliderCinema />
      <div className="w-full h-[8rem] md:h-[9rem] bg-white"></div>
      <ProjectsStrip />
      <FooterSection />
    </div>
  );
}
