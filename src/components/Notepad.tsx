import { useState, useEffect } from "react";
import "../styles/tools.css";

interface NotepadProps {
  onClose: () => void;
}

const STORAGE_KEY = "desktop-pet-notes";

function Notepad({ onClose }: NotepadProps) {
  const [text, setText] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, text);
    } catch {}
  }, [text]);

  return (
    <div className="tool-panel">
      <div className="tool-header">
        <span>📝 记事本</span>
        <button className="tool-close" onClick={onClose}>✕</button>
      </div>
      <textarea
        className="notepad-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="随便写点什么..."
        autoFocus
      />
    </div>
  );
}

export default Notepad;
