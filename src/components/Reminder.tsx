import { useState } from "react";
import "../styles/tools.css";

interface ReminderProps {
  onClose: () => void;
}

interface ReminderItem {
  id: number;
  text: string;
  minutes: number;
  timerId: number;
  fireAt: number;
}

function Reminder({ onClose }: ReminderProps) {
  const [text, setText] = useState("");
  const [minutes, setMinutes] = useState(5);
  const [reminders, setReminders] = useState<ReminderItem[]>([]);

  const addReminder = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const fireAt = Date.now() + minutes * 60000;
    const timerId = window.setTimeout(() => {
      new Notification("🐱 喵助手提醒", { body: trimmed });
      setReminders((prev) => prev.filter((r) => r.text !== trimmed || r.fireAt !== fireAt));
    }, minutes * 60000);
    setReminders((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, minutes, timerId, fireAt },
    ]);
    setText("");
  };

  const removeReminder = (item: ReminderItem) => {
    clearTimeout(item.timerId);
    setReminders((prev) => prev.filter((r) => r.id !== item.id));
  };

  return (
    <div className="tool-panel">
      <div className="tool-header">
        <span>⏰ 时间提醒</span>
        <button className="tool-close" onClick={onClose}>✕</button>
      </div>
      <div className="reminder-form">
        <input
          className="reminder-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="提醒内容..."
          onKeyDown={(e) => { if (e.key === "Enter") addReminder(); }}
        />
        <div className="reminder-time-row">
          <select
            className="reminder-select"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          >
            <option value={1}>1 分钟</option>
            <option value={5}>5 分钟</option>
            <option value={10}>10 分钟</option>
            <option value={15}>15 分钟</option>
            <option value={30}>30 分钟</option>
            <option value={60}>1 小时</option>
          </select>
          <button className="tool-btn" onClick={addReminder}>添加</button>
        </div>
      </div>
      {reminders.length > 0 && (
        <div className="reminder-list">
          {reminders.map((r) => (
            <div key={r.id} className="reminder-item">
              <span>{r.text} ({r.minutes}分钟后)</span>
              <button className="reminder-del" onClick={() => removeReminder(r)}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reminder;
