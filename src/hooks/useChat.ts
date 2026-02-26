import { useState, useCallback } from "react";
import { sendChatRequest, type ChatMessage, type ChatConfig } from "../utils/api";

const MAX_HISTORY = 10;

const DEFAULT_CONFIG: ChatConfig = {
  apiEndpoint: "https://api.openai.com",
  apiKey: "",
  model: "gpt-4o-mini",
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [lastReply, setLastReply] = useState<string>("");
  const [config, setConfig] = useState<ChatConfig>(() => {
    try {
      const saved = localStorage.getItem("desktop-pet-config");
      return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  const updateConfig = useCallback((newConfig: ChatConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem("desktop-pet-config", JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = { role: "user", content: text };
      const newMessages = [...messages, userMsg].slice(-MAX_HISTORY);
      setMessages(newMessages);
      setLastReply("思考中...");

      const reply = await sendChatRequest(newMessages, config);
      const assistantMsg: ChatMessage = { role: "assistant", content: reply };
      const updated = [...newMessages, assistantMsg].slice(-MAX_HISTORY);
      setMessages(updated);
      setLastReply(reply);

      // Clear bubble after 6 seconds
      setTimeout(() => setLastReply(""), 6000);
    },
    [messages, config]
  );

  return { messages, lastReply, sendMessage, config, updateConfig };
}
