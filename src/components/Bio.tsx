"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { footnotes, type Footnote } from "@/content/site";
import FisheyeText from "./FisheyeText";

/* ─────────────────────────────────────────────
   Desktop slide-in panel
   ───────────────────────────────────────────── */
function Panel({
  footnote,
  onClose,
}: {
  footnote: Footnote | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Focus trap: keep focus inside the panel when open
  useEffect(() => {
    if (footnote && panelRef.current) {
      panelRef.current.focus();
    }
  }, [footnote]);

  return (
    <>
      <div
        className={`panel-overlay ${footnote ? "open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        ref={panelRef}
        className={`panel ${footnote ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={footnote?.label ?? "Footnote"}
        tabIndex={-1}
      >
        {footnote && (
          <>
            <button className="panel-close" onClick={onClose}>
              Close ✕
            </button>
            <p className="panel-label">{footnote.label}</p>
            <p className="panel-body">{footnote.body}</p>
            {footnote.link && (
              <a
                className="panel-link"
                href={footnote.link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {footnote.link.text} ↗
              </a>
            )}
          </>
        )}
      </aside>
    </>
  );
}

/* ─────────────────────────────────────────────
   Mobile inline accordion
   ───────────────────────────────────────────── */
function MobileAccordion({ footnote }: { footnote: Footnote }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <span className="md:hidden">
      <span
        className="fn-accordion"
        style={
          expanded
            ? { maxHeight: "300px", opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
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
        setMobileExpanded(mobileExpanded === id ? null : id);
      } else {
        setActiveFootnote(fn);
      }
    },
    [isMobile, mobileExpanded]
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
