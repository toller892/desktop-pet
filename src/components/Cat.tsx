import { useState, useEffect, useCallback, useRef } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import "../styles/cat.css";

type CatState = "idle" | "meow" | "sleep";

interface CatProps {
  onClick: () => void;
}

function Cat({ onClick }: CatProps) {
  const [state, setState] = useState<CatState>("idle");
  const [eyeOpen, setEyeOpen] = useState(true);
  const dragRef = useRef(false);

  // Blink every 3-5 seconds in idle
  useEffect(() => {
    if (state !== "idle") return;
    const blink = () => {
      setEyeOpen(false);
      setTimeout(() => setEyeOpen(true), 150);
    };
    const id = setInterval(blink, 3000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, [state]);

  // Sleep after 30s idle
  useEffect(() => {
    const id = setTimeout(() => {
      if (state === "idle") setState("sleep");
    }, 30000);
    return () => clearTimeout(id);
  }, [state]);

  const handleMouseDown = useCallback(() => {
    dragRef.current = false;
    const timer = setTimeout(() => {
      dragRef.current = true;
      getCurrentWindow().startDragging();
    }, 150);
    const onUp = () => {
      clearTimeout(timer);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mouseup", onUp);
  }, []);

  const handleClick = useCallback(() => {
    if (dragRef.current) return;
    if (state === "sleep") {
      setState("idle");
    } else {
      setState("meow");
      setTimeout(() => setState("idle"), 1500);
    }
    onClick();
  }, [state, onClick]);

  const eyeClosed = !eyeOpen || state === "sleep";

  return (
    <div
      className={`cat cat--${state}`}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Desktop pet cat"
    >
      {/* Meow bubble */}
      {state === "meow" && <div className="cat__meow-bubble">喵~</div>}

      {/* Zzz for sleep */}
      {state === "sleep" && (
        <div className="cat__zzz">
          <span>z</span><span>Z</span><span>z</span>
        </div>
      )}

      <svg
        className="cat__svg"
        viewBox="0 0 120 120"
        width="120"
        height="120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFBF6B" />
            <stop offset="100%" stopColor="#F5A23B" />
          </radialGradient>
          <radialGradient id="headGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFCF7E" />
            <stop offset="100%" stopColor="#F5A23B" />
          </radialGradient>
        </defs>

        {/* Tail */}
        <path
          className="cat__tail"
          d="M 92 88 Q 110 75, 108 58 Q 106 48, 100 45"
          fill="none"
          stroke="#F5A23B"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Body */}
        <ellipse
          className="cat__body"
          cx="60" cy="88" rx="30" ry="22"
          fill="url(#bodyGrad)"
        />

        {/* Belly patch */}
        <ellipse cx="60" cy="92" rx="16" ry="12" fill="#FFE0A8" opacity="0.6" />

        {/* Left paw */}
        <ellipse cx="42" cy="106" rx="9" ry="6" fill="#F5A23B" />
        <ellipse cx="42" cy="106" rx="6" ry="4" fill="#FFD9A0" />

        {/* Right paw */}
        <ellipse cx="78" cy="106" rx="9" ry="6" fill="#F5A23B" />
        <ellipse cx="78" cy="106" rx="6" ry="4" fill="#FFD9A0" />

        {/* Head group */}
        <g className="cat__head">
          {/* Left ear outer */}
          <polygon points="28,38 18,12 42,30" fill="#F5A23B" />
          {/* Left ear inner */}
          <polygon points="29,35 22,17 39,31" fill="#FFB0B0" />

          {/* Right ear outer */}
          <polygon points="92,38 102,12 78,30" fill="#F5A23B" />
          {/* Right ear inner */}
          <polygon points="91,35 98,17 81,31" fill="#FFB0B0" />

          {/* Head shape */}
          <ellipse cx="60" cy="46" rx="32" ry="28" fill="url(#headGrad)" />

          {/* Forehead stripes */}
          <path d="M 54 28 Q 56 32, 54 36" stroke="#E8923A" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M 60 26 Q 60 31, 60 36" stroke="#E8923A" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M 66 28 Q 64 32, 66 36" stroke="#E8923A" strokeWidth="1.5" fill="none" opacity="0.5" />

          {/* Left blush */}
          <circle cx="36" cy="52" r="5" fill="#FF9999" opacity="0.4" />
          {/* Right blush */}
          <circle cx="84" cy="52" r="5" fill="#FF9999" opacity="0.4" />

          {/* Eyes */}
          {eyeClosed ? (
            <>
              <path className="cat__eye cat__eye--left" d="M 43 44 Q 48 48, 53 44" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path className="cat__eye cat__eye--right" d="M 67 44 Q 72 48, 77 44" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Left eye */}
              <ellipse className="cat__eye cat__eye--left" cx="48" cy="44" rx="6" ry="7" fill="#333" />
              <ellipse cx="48" cy="44" rx="4.5" ry="5.5" fill="#1A1A1A" />
              <circle cx="46" cy="42" r="2" fill="#FFF" opacity="0.9" />
              <circle cx="50" cy="46" r="1" fill="#FFF" opacity="0.5" />

              {/* Right eye */}
              <ellipse className="cat__eye cat__eye--right" cx="72" cy="44" rx="6" ry="7" fill="#333" />
              <ellipse cx="72" cy="44" rx="4.5" ry="5.5" fill="#1A1A1A" />
              <circle cx="70" cy="42" r="2" fill="#FFF" opacity="0.9" />
              <circle cx="74" cy="46" r="1" fill="#FFF" opacity="0.5" />
            </>
          )}

          {/* Nose */}
          <path d="M 58 52 L 60 55 L 62 52 Z" fill="#FF8B8B" />

          {/* Mouth */}
          {state === "meow" ? (
            <ellipse className="cat__mouth cat__mouth--open" cx="60" cy="58" rx="4" ry="3.5" fill="#FF6B6B" stroke="#333" strokeWidth="0.8" />
          ) : (
            <path className="cat__mouth" d="M 55 56 Q 58 60, 60 57 Q 62 60, 65 56" stroke="#333" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          )}

          {/* Whiskers */}
          <line x1="30" y1="48" x2="14" y2="45" stroke="#D4A050" strokeWidth="1" opacity="0.6" />
          <line x1="30" y1="52" x2="12" y2="53" stroke="#D4A050" strokeWidth="1" opacity="0.6" />
          <line x1="30" y1="56" x2="14" y2="60" stroke="#D4A050" strokeWidth="1" opacity="0.6" />
          <line x1="90" y1="48" x2="106" y2="45" stroke="#D4A050" strokeWidth="1" opacity="0.6" />
          <line x1="90" y1="52" x2="108" y2="53" stroke="#D4A050" strokeWidth="1" opacity="0.6" />
          <line x1="90" y1="56" x2="106" y2="60" stroke="#D4A050" strokeWidth="1" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}

export default Cat;
