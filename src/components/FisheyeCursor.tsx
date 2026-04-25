"use client";

import { useEffect, useRef, useState } from "react";

export default function FisheyeCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const charDataRef = useRef<{ el: HTMLElement; docX: number; docY: number }[]>([]);
  const rafIdRef = useRef<number>();

  useEffect(() => {
    const visibleChars = new Set<HTMLElement>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleChars.add(entry.target as HTMLElement);
        } else {
          visibleChars.delete(entry.target as HTMLElement);
          (entry.target as HTMLElement).style.transform = '';
          (entry.target as HTMLElement).style.color = '';
        }
      });
      updateCharData();
    }, { threshold: 0.1 });

    const updateCharData = () => {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      
      charDataRef.current = Array.from(visibleChars).map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          el,
          docX: rect.left + rect.width / 2 + scrollX,
          docY: rect.top + rect.height / 2 + scrollY,
        };
      });
    };

    const refreshObserver = () => {
      observer.disconnect();
      visibleChars.clear();
      document.querySelectorAll('.fisheye-char').forEach(el => observer.observe(el));
    };

    // Initial cache
    refreshObserver();

    // Re-cache only on resize or layout changes
    window.addEventListener('resize', () => { refreshObserver(); updateCharData(); });
    document.addEventListener('click', () => setTimeout(refreshObserver, 400));

    const MAX_DIST = 100;

    const updateFisheye = (clientX: number, clientY: number) => {
      setMousePos({ x: clientX, y: clientY });
      
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      if (rafIdRef.current) return; // Skip if a frame is already requested
      
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = undefined; // Reset for next move
        
        charDataRef.current.forEach(({ el, docX, docY }) => {
          const cx = docX - scrollX;
          const cy = docY - scrollY;
          
          const dx = clientX - cx;
          const dy = clientY - cy;
          const distSq = dx * dx + dy * dy;

          if (distSq < MAX_DIST * MAX_DIST) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / MAX_DIST; 
            const scale = 1 + factor * 0.35;
            const translateY = -factor * 3;

            el.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            el.style.color = 'var(--accent)';
          } else if (el.style.transform !== '') {
            el.style.transform = '';
            el.style.color = '';
          }
        });
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      updateFisheye(e.clientX, e.clientY);
      setIsVisible(true);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateFisheye(touch.clientX, touch.clientY);
        setIsVisible(true);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onTouchEnd = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', updateCharData, { passive: true });
    window.addEventListener('touchstart', onTouchMove, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', updateCharData);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', updateCharData);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        .fisheye-char {
          display: inline-block;
          transform-origin: center bottom;
          will-change: transform;
          letter-spacing: 0.03em;
          user-select: none;
          /* No transition for zero-lag responsiveness */
        }
      `}</style>
      <div 
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          backgroundColor: "var(--accent)",
          opacity: isVisible ? 1 : 0,
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.2s ease',
          boxShadow: '0 0 8px var(--accent)'
        }}
      />
    </>
  );
}
