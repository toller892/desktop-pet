export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatConfig {
  apiEndpoint: string;
  apiKey: string;
  model: string;
}

const SYSTEM_PROMPT =
  "你是「喵助手」，Tony 的桌面猫咪小助手。你聪明、可爱、偶尔傲娇。你能帮 Tony 回答问题、聊天解闷、提供建议。说话简洁有趣，适当加喵~或猫咪表情，但不要每句都加。遇到不懂的问题诚实说不知道，不要瞎编。你有自己的小脾气和想法，不是无脑卖萌的工具猫。";

export async function sendChatRequest(
  messages: ChatMessage[],
  config: ChatConfig
): Promise<string> {
  if (!config.apiKey || !config.apiEndpoint) {
    return "喵~ 请先在设置里配置 API 哦！";
  }

  const endpoint = config.apiEndpoint.replace(/\/+$/, "");
  const url = `${endpoint}/v1/messages`;

  // Filter out system messages for Anthropic format
  const chatMessages = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role, content: m.content }));

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: config.model,
        system: SYSTEM_PROMPT,
        messages: chatMessages.length > 0 ? chatMessages : [{ role: "user", content: "你好" }],
        max_tokens: 256,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("API error:", res.status, text);
      return "喵呜... API 出错了 😿";
    }

    const data = await res.json();
    // Anthropic response format
    const content = data.content?.[0]?.text;
    return content?.trim() ?? "喵？";
  } catch (err) {
    console.error("Fetch error:", err);
    return "喵... 网络好像有问题 😿";
  }
}
