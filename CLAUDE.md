# 盘中宝 · AI 协作指南

## 项目锚点

- 中文名：盘中宝
- 目录名：`pan`
- 类型：纯前端移动端基金盘中估值 PWA

用户说「盘中宝」时，优先定位到本仓库。

## 不可违背

1. 保持零框架、零构建流程。
2. 不与蜉蝣基金共用 localStorage 前缀；本项目使用 `panzhongbao_`。
3. 不把司南基金的 Vue/FastAPI 架构搬进来。
4. 不硬编码或输出真实 GitHub Token。
5. 任何持仓同步改动都要兼容旧数据。

## 关键文件

- `index.html`：页面与 PWA meta。
- `js/app.js`：核心逻辑。
- `css/style.css`：青绿插金主题。
- `manifest.json`：PWA 配置。
- `sw.js`：缓存和离线策略。

## 自检

```bash
node --check js/app.js
git status --short
```

静态项目无构建流程。修改 SW、manifest、图标或主 JS 时，注意缓存版本与安装体验。
