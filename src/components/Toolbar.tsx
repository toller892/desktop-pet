import "../styles/toolbar.css";

interface ToolbarProps {
  onSelect: (tool: string) => void;
}

const tools = [
  { id: "chat", icon: "💬", label: "聊天" },
  { id: "timer", icon: "⏱️", label: "计时器" },
  { id: "notepad", icon: "📝", label: "记事本" },
  { id: "reminder", icon: "⏰", label: "提醒" },
];

function Toolbar({ onSelect }: ToolbarProps) {
  return (
    <div className="toolbar">
      {tools.map((tool, i) => (
        <button
          key={tool.id}
          className="toolbar__btn"
          style={{ "--i": i, "--total": tools.length } as React.CSSProperties}
          onClick={() => onSelect(tool.id)}
          title={tool.label}
        >
          <span className="toolbar__icon">{tool.icon}</span>
          <span className="toolbar__label">{tool.label}</span>
        </button>
      ))}
    </div>
  );
}

export default Toolbar;
