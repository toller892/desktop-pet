# 🐱 Desktop Pet 桌面宠物

一只可爱的卡通橘猫，常驻你的桌面。能聊天、计时、记事、提醒，是你的贴心小助手。

![Tauri](https://img.shields.io/badge/Tauri-2.x-blue?logo=tauri)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ 功能

### 🐾 卡通橘猫
- SVG 矢量卡通风格，圆润可爱
- 大眼睛带高光、粉色腮红、虎纹额头
- 流畅动画：摇尾巴、眨眼、喵叫、睡觉呼吸
- 闲置 30 秒自动进入睡眠模式（Zzz~）
- 点击唤醒，按住拖拽移动

### 🛠️ 弹出工具栏
点击猫咪弹出环形工具栏（带弹跳动画），包含四个实用工具：

| 工具 | 功能 |
|------|------|
| 💬 聊天 | AI 智能对话，接 OpenAI / Anthropic 兼容 API |
| ⏱️ 计时器 | 秒表计时，开始/暂停/重置 |
| 📝 记事本 | 随手记录，自动保存到本地 |
| ⏰ 提醒 | 设置定时提醒，到时弹出系统通知 |

### 💬 AI 聊天
- 支持 OpenAI 和 Anthropic Messages API
- 可配置 API Endpoint、API Key、模型
- 猫咪人格：聪明、可爱、偶尔傲娇的「喵助手」
- 保留最近 10 条对话历史
- 回复以气泡形式显示

### 🖥️ 桌面体验
- 透明无边框窗口，猫咪浮在桌面上
- 始终置顶，不占任务栏
- 按住猫咪拖拽移动位置
- 系统托盘：右键菜单（显示/隐藏、设置、退出）

## 📸 预览

> 启动后，一只橘猫会出现在你的桌面上。点击它试试看！

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) >= 18
- [Rust](https://rustup.rs/) >= 1.70
- Windows 10/11（主要目标平台，也支持 macOS / Linux）

Windows 额外需要：
- [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
- [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)（Win10/11 通常已自带）

### 安装 & 运行

```bash
# 克隆项目
git clone https://github.com/toller892/desktop-pet.git
cd desktop-pet

# 安装依赖
npm install

# 开发模式运行
npm run tauri dev

# 打包发布
npm run tauri build
```

### 配置 AI 聊天

1. 点击猫咪 → 工具栏 → 💬 聊天
2. 通过系统托盘右键 → 设置，填入：
   - API Endpoint（如 `https://api.openai.com`）
   - API Key
   - Model（如 `gpt-4o-mini`）
3. 支持任何 OpenAI 兼容 API（Ollama、vLLM 等）

## 📁 项目结构

```
desktop-pet/
├── src-tauri/                # Tauri Rust 后端
│   ├── src/
│   │   ├── lib.rs            # 主逻辑 + 系统托盘
│   │   └── main.rs           # 入口
│   ├── capabilities/
│   │   └── default.json      # Tauri 权限配置
│   ├── Cargo.toml
│   └── tauri.conf.json
├── src/                      # React 前端
│   ├── components/
│   │   ├── Cat.tsx            # SVG 卡通猫咪
│   │   ├── Toolbar.tsx        # 环形弹出工具栏
│   │   ├── ChatBubble.tsx     # 聊天气泡
│   │   ├── ChatInput.tsx      # 聊天面板
│   │   ├── Timer.tsx          # 计时器
│   │   ├── Notepad.tsx        # 记事本
│   │   ├── Reminder.tsx       # 时间提醒
│   │   └── Settings.tsx       # 设置面板
│   ├── hooks/
│   │   └── useChat.ts         # AI 聊天逻辑
│   ├── utils/
│   │   └── api.ts             # API 调用
│   └── styles/
│       ├── cat.css            # 猫咪动画
│       ├── toolbar.css        # 工具栏样式
│       ├── tools.css          # 工具面板样式
│       └── app.css            # 全局样式
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🛠️ 技术栈

- [Tauri 2.x](https://v2.tauri.app/) — 轻量级桌面应用框架（~20MB 内存）
- [React 18](https://react.dev/) — UI 框架
- [TypeScript 5](https://www.typescriptlang.org/) — 类型安全
- [Vite 6](https://vitejs.dev/) — 极速构建
- SVG — 矢量猫咪动画，不依赖外部图片

## 📝 License

MIT
