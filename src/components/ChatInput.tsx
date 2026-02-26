import { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "../utils/api";
import "../styles/tools.css";

interface ChatInputProps {
  onSend: (text: string) => void;
  messages: ChatMessage[];
  onClose: () => void;
}

function ChatInput({ onSend, messages, onClose }: ChatInputProps) {
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const composingRef = useRef(false);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (composingRef.current) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  return (
    <div className="chat-panel">
      <div className="tool-header">
        <span>💬 聊天</span>
        <button className="tool-close" onClick={onClose}>✕</button>
      </div>
      <div className="chat-messages" ref={listRef}>
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg chat-msg--${m.role}`}>
            {m.content}
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          className="chat-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onCompositionStart={() => { composingRef.current = true; }}
          onCompositionEnd={(e) => {
            composingRef.current = false;
            setText((e.target as HTMLInputElement).value);
          }}
          placeholder="说点什么..."
          autoFocus
        />
        <button className="chat-send" type="submit">↑</button>
      </form>
    </div>
  );
}

export default ChatInput;
