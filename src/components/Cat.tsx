import { useState, useEffect, useCallback, useRef } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import "../styles/cat.css";

type CatState = "idle" | "meow" | "sleep" | "stretch" | "lick" | "purr" | "roll" | "pounce";

interface CatProps {
  onClick: () => void;
}

function Cat({ onClick }: CatProps) {
  const [state, setState] = useState<CatState>("idle");
  const [eyeOpen, setEyeOpen] = useState(true);
  const dragRef = useRef(false);
  const longPressRef = useRef(false);
  const stateTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Blink every 3-5 seconds in idle
  useEffect(() => {
    if (state !== "idle" && state !== "purr") return;
    const blink = () => {
      setEyeOpen(false);
      setTimeout(() => setEyeOpen(true), 150);
    };
    const id = setInterval(blink, 3000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, [state]);

  // Random idle actions
  useEffect(() => {
    if (state !== "idle") return;
    const actions: CatState[] = ["lick", "stretch", "pounce"];
    const delay = 15000 + Math.random() * 20000; // 15-35s
    const id = setTimeout(() => {
      const action = actions[Math.floor(Math.random() * actions.length)];
      setState(action);
      stateTimeoutRef.current = setTimeout(() => setState("idle"), action === "stretch" ? 2500 : 2000);
    }, delay);
    return () => { clearTimeout(id); clearTimeout(stateTimeoutRef.current); };
  }, [state]);

  // Sleep after 45s idle
  useEffect(() => {
    if (state !== "idle") return;
    const id = setTimeout(() => setState("sleep"), 45000);
    return () => clearTimeout(id);
  }, [state]);

  const handleMouseDown = useCallback(() => {
    dragRef.current = false;
    longPressRef.current = false;
    const dragTimer = setTimeout(() => {
      dragRef.current = true;
      getCurrentWindow().startDragging();
    }, 200);
    const purrTimer = setTimeout(() => {
      longPressRef.current = true;
      setState("purr");
    }, 800);
    const onUp = () => {
      clearTimeout(dragTimer);
      clearTimeout(purrTimer);
      if (longPressRef.current) {
        setTimeout(() => setState("idle"), 1500);
      }
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mouseup", onUp);
  }, []);

  const handleClick = useCallback(() => {
    if (dragRef.current || longPressRef.current) return;
    if (state === "sleep") {
      setState("stretch");
      setTimeout(() => setState("idle"), 2500);
    } else if (state === "idle") {
      setState("meow");
      setTimeout(() => setState("idle"), 1500);
    }
    onClick();
  }, [state, onClick]);

  const handleDoubleClick = useCallback(() => {
    if (state === "idle" || state === "meow") {
      setState("roll");
      setTimeout(() => setState("idle"), 2500);
    }
  }, [state]);

  const eyeClosed = !eyeOpen || state === "sleep" || state === "purr";
  const showForkedTail = true; // 罗小黑标志性分叉尾巴

  return (
    <div
      className={`cat cat--${state}`}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      role="button"
      tabIndex={0}
      aria-label="Desktop pet cat - Luo Xiaohei style"
    >
      {/* Meow bubble */}
      {state === "meow" && <div className="cat__meow-bubble">喵~</div>}

      {/* Purr hearts */}
      {state === "purr" && (
        <div className="cat__hearts">
          <span>♥</span><span>♥</span><span>♥</span>
        </div>
      )}

      {/* Zzz for sleep */}
      {state === "sleep" && (
        <div className="cat__zzz">
          <span>z</span><span>Z</span><span>z</span>
        </div>
      )}

      <svg
        className="cat__svg"
        viewBox="0 0 140 130"
        width="140"
        height="130"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bodyGrad" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#2A2A2A" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </radialGradient>
          <radialGradient id="headGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#2E2E2E" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </radialGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="70%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#E8920A" />
          </radialGradient>
        </defs>

        {/* === Forked Tail (罗小黑标志) === */}
        <g className="cat__tail">
          {showForkedTail ? (
            <>
              <path
                d="M 105 92 Q 125 78, 126 60 Q 127 50, 124 42"
                fill="none" stroke="#1A1A1A" strokeWidth="5" strokeLinecap="round"
              />
              {/* Fork left */}
              <path
                d="M 124 42 Q 120 34, 116 30"
                fill="none" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round"
              />
              {/* Fork right */}
              <path
                d="M 124 42 Q 128 34, 132 30"
                fill="none" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round"
              />
              {/* Fork tips - small round ends */}
              <circle cx="115" cy="29" r="3" fill="#1A1A1A" />
              <circle cx="133" cy="29" r="3" fill="#1A1A1A" />
            </>
          ) : (
            <path
              d="M 105 92 Q 125 78, 123 58 Q 121 48, 115 44"
              fill="none" stroke="#1A1A1A" strokeWidth="5" strokeLinecap="round"
            />
          )}
        </g>

        {/* === Body === */}
        <ellipse
          className="cat__body"
          cx="68" cy="94" rx="32" ry="24"
          fill="url(#bodyGrad)"
        />

        {/* Belly - subtle dark grey */}
        <ellipse cx="68" cy="98" rx="18" ry="13" fill="#222" opacity="0.5" />

        {/* === Paws === */}
        <g className="cat__paws">
          {/* Left front paw */}
          <ellipse cx="48" cy="114" rx="10" ry="6" fill="#1A1A1A" />
          <ellipse cx="48" cy="114" rx="7" ry="4" fill="#2A2A2A" />
          {/* Paw pads */}
          <circle cx="45" cy="115" r="1.5" fill="#FFB0B0" opacity="0.6" />
          <circle cx="48" cy="116" r="1.5" fill="#FFB0B0" opacity="0.6" />
          <circle cx="51" cy="115" r="1.5" fill="#FFB0B0" opacity="0.6" />

          {/* Right front paw */}
          <ellipse cx="88" cy="114" rx="10" ry="6" fill="#1A1A1A" />
          <ellipse cx="88" cy="114" rx="7" ry="4" fill="#2A2A2A" />
          <circle cx="85" cy="115" r="1.5" fill="#FFB0B0" opacity="0.6" />
          <circle cx="88" cy="116" r="1.5" fill="#FFB0B0" opacity="0.6" />
          <circle cx="91" cy="115" r="1.5" fill="#FFB0B0" opacity="0.6" />
        </g>

        {/* === Lick paw (only in lick state, drawn via CSS visibility) === */}
        <g className="cat__lick-paw">
          <ellipse cx="52" cy="62" rx="6" ry="5" fill="#1A1A1A" />
          <circle cx="50" cy="63" r="1.2" fill="#FFB0B0" opacity="0.7" />
          <circle cx="52" cy="64" r="1.2" fill="#FFB0B0" opacity="0.7" />
          <circle cx="54" cy="63" r="1.2" fill="#FFB0B0" opacity="0.7" />
        </g>

        {/* === Head group === */}
        <g className="cat__head">
          {/* Left ear */}
          <polygon points="34,42 22,14 50,34" fill="#1A1A1A" />
          <polygon points="35,38 26,20 47,34" fill="#FFB0B0" opacity="0.5" />

          {/* Right ear */}
          <polygon points="102,42 114,14 86,34" fill="#1A1A1A" />
          <polygon points="101,38 110,20 89,34" fill="#FFB0B0" opacity="0.5" />

          {/* Head shape - rounder for 罗小黑 */}
          <ellipse cx="68" cy="50" rx="35" ry="30" fill="url(#headGrad)" />

          {/* === Eyes === */}
          {eyeClosed ? (
            <>
              <path className="cat__eye cat__eye--left"
                d="M 48 48 Q 54 53, 60 48"
                stroke="#FFD700" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path className="cat__eye cat__eye--right"
                d="M 76 48 Q 82 53, 88 48"
                stroke="#FFD700" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Left eye - big golden 罗小黑 style */}
              <ellipse className="cat__eye cat__eye--left"
                cx="54" cy="48" rx="9" ry="10" fill="url(#eyeGlow)" />
              <ellipse cx="54" cy="48" rx="4" ry="6" fill="#111" />
              <circle cx="51" cy="45" r="2.5" fill="#FFF" opacity="0.9" />
              <circle cx="56" cy="50" r="1.2" fill="#FFF" opacity="0.5" />

              {/* Right eye */}
              <ellipse className="cat__eye cat__eye--right"
                cx="82" cy="48" rx="9" ry="10" fill="url(#eyeGlow)" />
              <ellipse cx="82" cy="48" rx="4" ry="6" fill="#111" />
              <circle cx="79" cy="45" r="2.5" fill="#FFF" opacity="0.9" />
              <circle cx="84" cy="50" r="1.2" fill="#FFF" opacity="0.5" />
            </>
          )}

          {/* Nose - small pink triangle */}
          <path d="M 66 58 L 68 61 L 70 58 Z" fill="#FFB0B0" />

          {/* Mouth */}
          {state === "meow" ? (
            <ellipse className="cat__mouth cat__mouth--open"
              cx="68" cy="65" rx="5" ry="4" fill="#FF6B6B"
              stroke="#333" strokeWidth="0.8" />
          ) : state === "lick" ? (
            <>
              <path className="cat__mouth"
                d="M 63 63 Q 66 67, 68 64 Q 70 67, 73 63"
                stroke="#333" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              {/* Tongue */}
              <ellipse cx="68" cy="66" rx="3" ry="2" fill="#FF8B8B" />
            </>
          ) : (
            <path className="cat__mouth"
              d="M 63 63 Q 66 67, 68 64 Q 70 67, 73 63"
              stroke="#333" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          )}

          {/* Whiskers - subtle */}
          <line x1="38" y1="54" x2="20" y2="51" stroke="#444" strokeWidth="0.8" opacity="0.5" />
          <line x1="38" y1="58" x2="18" y2="59" stroke="#444" strokeWidth="0.8" opacity="0.5" />
          <line x1="38" y1="62" x2="20" y2="66" stroke="#444" strokeWidth="0.8" opacity="0.5" />
          <line x1="98" y1="54" x2="116" y2="51" stroke="#444" strokeWidth="0.8" opacity="0.5" />
          <line x1="98" y1="58" x2="118" y2="59" stroke="#444" strokeWidth="0.8" opacity="0.5" />
          <line x1="98" y1="62" x2="116" y2="66" stroke="#444" strokeWidth="0.8" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

export default Cat;
