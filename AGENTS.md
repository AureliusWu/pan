# AGENTS.md

## 项目识别

- 目录名：`pan`
- 中文名：盘中宝
- 用户说「盘中宝」时，指本项目。
- 线上形态：GitHub Pages 托管的手机端基金盘中估值 PWA。

## 项目定位

盘中宝是独立维护的移动端基金盘中观察工具，专注基金盘中估值、指数/黄金行情、持仓市值、关注模式和 GitHub Gist 多设备同步。它不是蜉蝣基金测试版，也不是司南基金子模块。

## 技术结构

- 零框架：原生 HTML/CSS/JavaScript，无构建工具。
- `index.html`：页面结构与 PWA 入口。
- `js/app.js`：估值、持仓、Gist 同步、通知、渲染。
- `css/style.css`：青绿插金主题。
- `manifest.json`、`sw.js`：PWA 与离线缓存。

## 数据源与约定

- 基金估值：天天基金 JSONP + 东方财富备源。
- 指数行情：腾讯行情 JSONP。
- 黄金行情：独立行情源与缓存。
- 云同步：GitHub Gist API。
- 本地存储使用 `panzhongbao_` 前缀，不能与 `fuyu_` 混用。

## 开发规则

- 保持移动端首屏优先。
- 不引入框架或构建流程。
- 持仓、同步、删除 tombstone、导入导出改动必须兼容已有 localStorage 数据。
- 自动刷新、通知、下拉刷新要考虑休市、午休、周末和网络失败。
- 不写真实 GitHub Token。

## 项目边界

- `FundVal` 是蜉蝣基金，另一个独立盘中估值工具。
- `fund-compass` 是司南基金，负责选基、择时、回测和资产分析。
