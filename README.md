# Desktop Pet 🐱

一个基于 Tauri 2.x + React + TypeScript 的桌面宠物应用。像素风小猫会在你的桌面上陪伴你，还能通过 AI 聊天。

## 功能

- 像素风小猫（纯 CSS 动画，无外部图片依赖）
- idle / 喵叫 / 睡觉 三种状态
- AI 聊天（接 OpenAI 兼容 API）
- 透明无边框窗口，始终置顶
- 系统托盘（显示/隐藏、设置、退出）
- 可拖拽移动

## 前置要求

- [Node.js](https://nodejs.org/) >= 18
- [Rust](https://www.rust-lang.org/tools/install) >= 1.70
- Tauri 2.x 系统依赖（参考 [Tauri 官方文档](https://v2.tauri.app/start/prerequisites/)）

### Linux (Ubuntu/Debian) 额外依赖

```bash
sudo apt update
sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file \
  libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

## 安装

```bash
cd desktop-pet

# 安装前端依赖
npm install
```

## 开发运行

```bash
npm run tauri dev
```

## 构建

```bash
npm run tauri build
```

## AI 聊天配置

1. 点击猫咪打开聊天框
2. 通过系统托盘右键菜单 → 设置，配置：
   - API Endpoint（如 `https://api.openai.com/v1`）
   - API Key
   - 模型名（如 `gpt-4o-mini`）

支持任何 OpenAI 兼容 API。

## 项目结构

```
desktop-pet/
├── src-tauri/           # Tauri 后端 (Rust)
│   ├── src/
│   │   ├── main.rs
│   │   └── lib.rs       # 主逻辑 + 系统托盘
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   └── icons/
├── src/                 # React 前端
│   ├── App.tsx
│   ├── main.tsx
│   ├── components/
│   │   ├── Cat.tsx      # 猫咪组件（CSS 动画）
│   │   ├── ChatBubble.tsx
│   │   ├── ChatInput.tsx
│   │   └── Settings.tsx
│   ├── hooks/
│   │   └── useChat.ts   # AI 聊天 hook
│   ├── styles/
│   │   ├── cat.css
│   │   └── app.css
│   └── utils/
│       └── api.ts       # OpenAI API 调用
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```
