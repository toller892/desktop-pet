import { useState } from "react";

export interface ChatConfig {
  apiEndpoint: string;
  apiKey: string;
  model: string;
}

interface SettingsProps {
  config: ChatConfig;
  onUpdate: (config: ChatConfig) => void;
  onClose: () => void;
}

function Settings({ config, onUpdate, onClose }: SettingsProps) {
  const [local, setLocal] = useState<ChatConfig>({ ...config });

  const handleSave = () => {
    onUpdate(local);
    onClose();
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "4px 6px",
    fontSize: 11,
    fontFamily: "monospace",
    border: "1px solid #ccc",
    borderRadius: 4,
    marginBottom: 6,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    fontFamily: "monospace",
    color: "#555",
    marginBottom: 2,
    display: "block",
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 200,
        height: 250,
        background: "rgba(255,255,255,0.97)",
        borderRadius: 8,
        padding: 12,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: "bold", marginBottom: 6, fontFamily: "monospace" }}>
        ⚙️ 设置
      </div>

      <label style={labelStyle}>API Endpoint</label>
      <input
        style={inputStyle}
        value={local.apiEndpoint}
        onChange={(e) => setLocal({ ...local, apiEndpoint: e.target.value })}
        placeholder="https://api.openai.com/v1"
        aria-label="API Endpoint"
      />

      <label style={labelStyle}>API Key</label>
      <input
        style={inputStyle}
        type="password"
        value={local.apiKey}
        onChange={(e) => setLocal({ ...local, apiKey: e.target.value })}
        placeholder="sk-..."
        aria-label="API Key"
      />

      <label style={labelStyle}>模型</label>
      <input
        style={inputStyle}
        value={local.model}
        onChange={(e) => setLocal({ ...local, model: e.target.value })}
        placeholder="gpt-4o-mini"
        aria-label="Model name"
      />

      <div style={{ display: "flex", gap: 6, marginTop: "auto" }}>
        <button
          onClick={handleSave}
          style={{
            flex: 1,
            padding: "4px 0",
            fontSize: 11,
            fontFamily: "monospace",
            background: "#333",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          保存
        </button>
        <button
          onClick={onClose}
          style={{
            flex: 1,
            padding: "4px 0",
            fontSize: 11,
            fontFamily: "monospace",
            background: "#eee",
            color: "#333",
            border: "1px solid #ccc",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          取消
        </button>
      </div>
    </div>
  );
}

export default Settings;
