import { useState, useCallback, useEffect } from "react";
import Cat from "./components/Cat";
import ChatBubble from "./components/ChatBubble";
import ChatInput from "./components/ChatInput";
import Settings from "./components/Settings";
import Toolbar from "./components/Toolbar";
import Timer from "./components/Timer";
import Notepad from "./components/Notepad";
import Reminder from "./components/Reminder";
import { useChat } from "./hooks/useChat";

type ActiveTool = null | "chat" | "timer" | "notepad" | "reminder" | "settings";

function App() {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const { messages, lastReply, sendMessage, config, updateConfig } = useChat();

  const handleCatClick = useCallback(() => {
    if (activeTool) {
      setActiveTool(null);
      setShowToolbar(false);
    } else {
      setShowToolbar((prev) => !prev);
    }
  }, [activeTool]);

  const handleToolSelect = useCallback((tool: string) => {
    setShowToolbar(false);
    setActiveTool(tool as ActiveTool);
  }, []);

  const handleClose = useCallback(() => {
    setActiveTool(null);
  }, []);

  const handleSend = useCallback(
    async (text: string) => {
      await sendMessage(text);
    },
    [sendMessage]
  );

  useEffect(() => {
    const handler = () => {
      setShowToolbar(false);
      setActiveTool("settings");
    };
    window.addEventListener("open-settings", handler);
    return () => window.removeEventListener("open-settings", handler);
  }, []);

  return (
    <div className="app-container" data-tauri-drag-region>
      {lastReply && !activeTool && <ChatBubble message={lastReply} />}

      {activeTool === "chat" && (
        <ChatInput onSend={handleSend} messages={messages} onClose={handleClose} />
      )}
      {activeTool === "timer" && <Timer onClose={handleClose} />}
      {activeTool === "notepad" && <Notepad onClose={handleClose} />}
      {activeTool === "reminder" && <Reminder onClose={handleClose} />}
      {activeTool === "settings" && (
        <Settings config={config} onUpdate={updateConfig} onClose={handleClose} />
      )}

      {showToolbar && !activeTool && (
        <Toolbar onSelect={handleToolSelect} />
      )}

      <Cat onClick={handleCatClick} />
    </div>
  );
}

export default App;
