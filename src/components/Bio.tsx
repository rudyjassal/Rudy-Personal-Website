"use client";

import { useState, useEffect, useCallback } from "react";
import FisheyeText from "./FisheyeText";
import { footnotes, type Footnote } from "@/content/site";

/* ─────────────────────────────────────────────
   Slide-in panel (desktop)
   ───────────────────────────────────────────── */
function Panel({
  footnote,
  onClose,
}: {
  footnote: Footnote | null;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className={`panel-overlay ${footnote ? "open" : ""}`}
        onClick={onClose}
      />
      <div className={`panel ${footnote ? "open" : ""}`}>
        {footnote && (
          <div className="animate-section">
            <button
              onClick={onClose}
              className="text-[10px] uppercase tracking-widest text-muted hover:text-accent mb-12 flex items-center gap-2"
            >
              <span>←</span> Close
            </button>

            <p
              style={{
                fontFamily: '"Inter Tight", system-ui, sans-serif',
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#666",
                marginBottom: "1rem",
              }}
            >
              Footnote [{footnote.id}]
            </p>

            <h2 className="text-3xl font-serif text-white mb-6">
              {footnote.label}
            </h2>

            <div className="text-body font-serif text-lg leading-relaxed mb-10 opacity-90">
              {footnote.body}
            </div>

            {footnote.link && (
              <a
                href={footnote.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 py-3 px-6 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm uppercase tracking-widest text-accent"
              >
                {footnote.link.text} ↗
              </a>
            )}
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   Mobile inline accordion
   ───────────────────────────────────────────── */
function MobileAccordion({ footnote }: { footnote: Footnote }) {
  return (
    <span className="md:hidden">
      <span
        className="fn-accordion expanded"
        style={{ maxHeight: "300px", opacity: 1 }}
      >
        <span className="fn-accordion-inner block">
          <strong
            style={{
              fontFamily: '"Inter Tight", system-ui, sans-serif',
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#888",
            }}
          >
            {footnote.label}
          </strong>
          <br />
          {footnote.body}
          {footnote.link && (
            <>
              {" "}
              <a
                className="panel-link"
                href={footnote.link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "14px" }}
              >
                {footnote.link.text} ↗
              </a>
            </>
          )}
        </span>
      </span>
    </span>
  );
}

/* ─────────────────────────────────────────────
   Bio paragraph with footnote refs
   ───────────────────────────────────────────── */
export default function Bio() {
  const [activeFootnote, setActiveFootnote] = useState<Footnote | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleFootnoteClick = useCallback(
    (id: number) => {
      const fn = footnotes.find((f) => f.id === id) ?? null;
      if (isMobile) {
        setMobileExpanded(prev => prev === id ? null : id);
      } else {
        setActiveFootnote(fn);
      }
    },
    [isMobile]
  );

  const closePanel = useCallback(() => setActiveFootnote(null), []);

  /* Build bio text with superscripts inline */
  const bioSegments = [
    { text: "Yoooo, I'm Rudy. I am trynna change how the world views data!!", fn: null },
  ];

  return (
    <>
      <p className="font-serif" style={{ fontSize: "17px", lineHeight: 1.65 }}>
        {bioSegments.map((seg, i) => (
          <span key={i}>
            <FisheyeText>{seg.text}</FisheyeText>
            {seg.fn !== null && (
              <>
                <button
                  className="fn-ref"
                  onClick={() => handleFootnoteClick(seg.fn!)}
                  aria-label={`Footnote ${seg.fn}`}
                  tabIndex={0}
                >
                  [{seg.fn}]
                </button>
                {isMobile && mobileExpanded === seg.fn && (
                  <MobileAccordion
                    footnote={footnotes.find((f) => f.id === seg.fn)!}
                  />
                )}
              </>
            )}
          </span>
        ))}
      </p>

      {/* Desktop panel */}
      {!isMobile && <Panel footnote={activeFootnote} onClose={closePanel} />}
    </>
  );
}
