"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const POKEMON = [
  { id: 6, name: "Charizard", color: "red" },
  { id: 9, name: "Blastoise", color: "blue" },
  { id: 25, name: "Pikachu", color: "yellow" },
  { id: 3, name: "Venusaur", color: "green" },
];

const getSpriteUrl = (id: number) => 
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;

const POKEBALL_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

type Particle = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number };

export default function PokemonEngine() {
  const pathname = usePathname();
  const [burst, setBurst] = useState(false);
  const [scattered, setScattered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [charPos, setCharPos] = useState({ x: -1, y: -1 }); 
  const [hasBeenDragged, setHasBeenDragged] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const movedRef = useRef(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const particlesRef = useRef<Particle[]>([]);
  const isDraggingRef = useRef(false);
  const charPosRef = useRef({ x: 50, y: 50 });
  const indexRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const holdTimeoutRef = useRef<NodeJS.Timeout>();

  const startPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => { isDraggingRef.current = isDragging; }, [isDragging]);
  useEffect(() => { charPosRef.current = charPos; }, [charPos]);
  useEffect(() => { indexRef.current = currentIndex; }, [currentIndex]);

  useEffect(() => {
    const updatePosition = () => {
      // Only snap to the headline if the user hasn't manually moved it yet
      if (hasBeenDragged) return;

      // Find the appropriate headline anchor for the current page
      let targetId = "aka-rudy";
      if (pathname === "/life-story") targetId = "life-story-headline";
      if (pathname === "/projects") targetId = "projects-headline";
      if (pathname === "/tunes") targetId = "tunes-headline";

      const target = document.getElementById(targetId);
      
      if (target) {
        const rect = target.getBoundingClientRect();
        let offset = 40;
        if (pathname === "/life-story") offset = 100;
        if (pathname === "/projects") offset = 80;
        if (pathname === "/tunes") offset = 80;
        setCharPos({ x: rect.right + offset, y: rect.top + rect.height / 2 });
      } else if (charPos.x === -1) {
        setCharPos({ x: 700, y: 110 });
      }
    };

    const timeout = setTimeout(updatePosition, 100);
    return () => clearTimeout(timeout);
  }, [pathname, charPos.x, hasBeenDragged]);

  useEffect(() => {
    if (charPos.x === -1) {
      setCurrentIndex(Math.floor(Math.random() * POKEMON.length));
    }
  }, [charPos.x]);

  const handleSwitch = () => {
    setCurrentIndex(prev => (prev + 1) % POKEMON.length);
    particlesRef.current = [];
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    startPosRef.current = { x: clientX, y: clientY };
    movedRef.current = false;
    const now = Date.now();
    
    // Detection for long press (hold)
    holdTimeoutRef.current = setTimeout(() => {
      if (!movedRef.current) {
        setBurst(false);
        setScattered(false);
        setIsDragging(false);
      }
    }, 800);

    if (now - lastClickTimeRef.current < 300) {
      clearTimeout(holdTimeoutRef.current);
      handleSwitch();
      lastClickTimeRef.current = 0;
    } else {
      lastClickTimeRef.current = now;
      setIsDragging(true);
    }
  };

  const handlePointerUp = () => {
    clearTimeout(holdTimeoutRef.current);
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        
        const dx = clientX - startPosRef.current.x;
        const dy = clientY - startPosRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 10) {
          movedRef.current = true;
          setHasBeenDragged(true); // User has moved it, stop auto-snapping
          clearTimeout(holdTimeoutRef.current);
        }

        setCharPos({ x: clientX, y: clientY });
      }
    };
    const handleGlobalEnd = handlePointerUp;

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMove);
      window.addEventListener("mouseup", handleGlobalEnd);
      window.addEventListener("touchmove", handleGlobalMove, { passive: false });
      window.addEventListener("touchend", handleGlobalEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalEnd);
      window.removeEventListener("touchmove", handleGlobalMove);
      window.removeEventListener("touchend", handleGlobalEnd);
    };
  }, [isDragging]);

  useEffect(() => {
    if (burst) setTimeout(() => setScattered(true), 50);
  }, [burst]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const createPBuffer = (colors: string[]) => {
      const b = document.createElement("canvas");
      b.width = 64; b.height = 64;
      const bc = b.getContext("2d")!;
      const g = bc.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255, 255, 255, 1)");
      g.addColorStop(0.2, colors[0]);
      g.addColorStop(0.5, colors[1]);
      g.addColorStop(0.8, colors[2]);
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      bc.fillStyle = g; bc.fillRect(0, 0, 64, 64);
      return b;
    };

    const redP = createPBuffer(["rgba(255, 200, 0, 0.8)", "rgba(255, 80, 0, 0.5)", "rgba(200, 0, 0, 0.15)"]);
    const blueP = createPBuffer(["rgba(0, 255, 255, 0.8)", "rgba(0, 100, 255, 0.5)", "rgba(0, 0, 150, 0.15)"]);
    const yellowP = createPBuffer(["rgba(255, 255, 0, 0.8)", "rgba(255, 200, 0, 0.5)", "rgba(150, 150, 0, 0.15)"]);
    const greenP = createPBuffer(["rgba(0, 255, 0, 0.8)", "rgba(0, 150, 0, 0.5)", "rgba(0, 100, 0, 0.15)"]);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const render = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      if (isDraggingRef.current && charPosRef.current.x !== -1) {
        const pkmn = POKEMON[indexRef.current];
        let mouthX = charPosRef.current.x - 100;
        let mouthY = charPosRef.current.y - 40;

        if (pkmn.id === 9) { mouthX += 20; mouthY -= 20; } // Blastoise
        if (pkmn.id === 25) { mouthX += 40; mouthY += 10; } // Pikachu
        if (pkmn.id === 3) { mouthX += 30; mouthY -= 10; } // Venusaur

        for (let i = 0; i < 4; i++) {
          particlesRef.current.push({
            x: mouthX, y: mouthY + (Math.random() * 20 - 10),
            vx: -(Math.random() * 20 + 15), vy: (Math.random() - 0.5) * 8,
            life: 1.0, maxLife: Math.random() * 0.8 + 0.8, size: Math.random() * 20 + 15,
          });
        }
      }

      const currentPkmn = POKEMON[indexRef.current];
      const pImg = currentPkmn.id === 6 ? redP : currentPkmn.id === 9 ? blueP : currentPkmn.id === 25 ? yellowP : greenP;

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx; p.y += p.vy;
        p.life -= 0.008 / p.maxLife;
        p.size += 1.8;
        p.vy += (Math.random() - 0.5) * 1.5;
        if (p.life <= 0) { particlesRef.current.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.drawImage(pImg, p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[100]" />
      
      {/* Absolute fixed layer for the pokemon/pokeball */}
      <div className="fixed inset-0 pointer-events-none z-[101]">
        {!burst ? (
          <button 
            onClick={(e) => { e.stopPropagation(); if(!movedRef.current) setBurst(true); }} 
            className="pointer-events-auto absolute transition-transform hover:scale-110 active:scale-95"
            style={{ 
              left: `${charPos.x}px`, 
              top: `${charPos.y}px`, 
              transform: 'translate(-50%, -50%)' 
            }}
          >
            <img src={POKEBALL_URL} alt="Pokeball" className="w-16 h-16 md:w-24 md:h-24 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-bounce" style={{ imageRendering: "pixelated" }} />
          </button>
        ) : (
          <>
            <div className="fixed inset-0 bg-accent/20 pointer-events-none z-0 transition-opacity duration-700 ease-out" style={{ opacity: scattered ? 0 : 0.8 }} />
            {charPos.x !== -1 && (
              <div
                onMouseDown={handlePointerDown}
                onTouchStart={handlePointerDown}
                className="fixed z-[102] cursor-grab active:cursor-grabbing select-none fisheye-char pointer-events-auto w-[60px] h-[60px] md:w-[90px] md:h-[90px]"
                style={{
                  left: `${charPos.x}px`,
                  top: `${charPos.y}px`,
                  transform: "translate(-50%, -50%) scale(3.5) md:scale(5)",
                  willChange: "left, top",
                  transformOrigin: "center center"
                }}
              >
                <img
                  src={getSpriteUrl(POKEMON[currentIndex].id)}
                  alt={POKEMON[currentIndex].name}
                  draggable={false}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
