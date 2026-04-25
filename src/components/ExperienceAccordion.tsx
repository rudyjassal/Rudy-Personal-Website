"use client";

import { useState } from "react";
import FisheyeText from "./FisheyeText";

export default function ExperienceAccordion({ 
  title, 
  logoSrc, 
  description, 
  invertDark 
}: { 
  title: string, 
  logoSrc: string, 
  description: string, 
  invertDark?: boolean 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block w-full mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 align-middle hover:opacity-70 transition-opacity text-left cursor-pointer py-1"
      >
        <span><FisheyeText>{title}</FisheyeText></span>
        <img 
          src={logoSrc} 
          alt={`${title} Logo`} 
          className={`h-[22px] w-auto object-contain rounded-sm ${invertDark ? 'theme-invert' : ''}`} 
        />
      </button>
      
      <div className={`fn-accordion w-full ${isOpen ? "expanded" : ""}`}>
        <div className="mt-2 mb-4 ml-[-1.1em] pl-[1.1em] border-l-2 border-[var(--accent-faint)] opacity-80 text-[15px] leading-[1.8] py-1">
          <FisheyeText>{description}</FisheyeText>
        </div>
      </div>
    </div>
  );
}
