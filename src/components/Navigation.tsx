"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FisheyeText from "./FisheyeText";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Life Story", href: "/life-story" },
    { label: "Projects", href: "/projects" },
    { label: "Tunes", href: "/tunes" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[2000] py-6 md:py-8 pointer-events-none bg-black/90 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-[850px] mx-auto px-6 flex justify-center items-center gap-6 md:gap-10 pointer-events-auto">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`text-[11px] uppercase tracking-[0.2em] font-sans transition-all hover:text-accent ${
              pathname === item.href ? "text-accent font-semibold" : "text-white/40"
            }`}
          >
            <FisheyeText>{item.label}</FisheyeText>
          </Link>
        ))}
      </div>
    </nav>
  );
}
