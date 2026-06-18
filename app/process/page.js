"use client";

import React from "react";
import FooterSection from "@/components/FooterSection";
import TailwindCapsulesStickyCards from "@/components/TailwindCapsulesStickyCards";
import ProjectsStrip from "@/components/ProjectsStrip";

export default function ProcessPage() {
  return (
    <>
      <TailwindCapsulesStickyCards />
      <ProjectsStrip />
      <FooterSection />
    </>
  );
}
