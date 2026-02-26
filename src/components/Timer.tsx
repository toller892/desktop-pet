import { useState, useEffect, useRef, useCallback } from "react";
import "../styles/tools.css";

interface TimerProps {
  onClose: () => void;
}

function Timer({ onClose }: TimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const format = useCallback((s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }, []);

  const handleReset = () => {
    setRunning(false);
    setSeconds(0);
  };

  return (
    <div className="tool-panel">
      <div className="tool-header">
        <span>⏱️ 计时器</span>
        <button className="tool-close" onClick={onClose}>✕</button>
      </div>
      <div className="timer-display">{format(seconds)}</div>
      <div className="timer-controls">
        <button className="tool-btn" onClick={() => setRunning(!running)}>
          {running ? "暂停" : "开始"}
        </button>
        <button className="tool-btn tool-btn--secondary" onClick={handleReset}>
          重置
        </button>
      </div>
    </div>
  );
}

export default Timer;
