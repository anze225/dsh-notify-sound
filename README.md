# dsh-notify-sound

> 给 **dsh（DeepSeek Harness）** 的消息提示音插件。它播放的不是自造音效，而是 **OpenAI Codex 自带的完成提示音**（`codex-notification.wav`）。

当 AI 回复一轮结束、或应用需要你介入（授权 / 审批 / 提问）时，在 dsh 的 Web / 桌面界面里响起 Codex 那声清脆的"叮"。

## 功能

- **Codex 原生音效**：`codex-notification.wav` 取自本机 Codex 桌面版（48kHz、约 0.57s 的明亮短叮），以 base64 内嵌进 `client.js`，自包含、无需任何外部音频文件。
- **两种触发**
  - 一轮回复完成：窗口在后台 / 不聚焦，或完成的是你没在看的会话时**必响**；你正盯着当前会话时不打扰。
  - 需要你介入（授权 / 审批 / 提问 / 计划确认）：**总是响**，并把同一提示音连响两下以示提醒。
- **不打扰**：自动过滤 subagent 子会话；可一键静音。
- **可配置**：完成时机、需介入开关、两类不同音、音量。

## 使用

会话输入框上方的工具栏里有一个小喇叭按钮：

- **左键**：静音 / 开启。
- **右键**：设置菜单
  - 完成时：仅后台时（默认）/ 总是 / 关闭
  - 需要授权 / 回答时：开（默认）
  - 两类用不同音：开（默认 = 完成单击、需介入双击）
  - 音量：默认 78%
  - 试听

配置保存在浏览器 `localStorage` 的 `dsh-notify-sound:cfg` 键中。

## 安装

作为 dsh 的 profile 插件（web 客户端插件）安装：

1. 把本包放到 profile 的 `node_modules/dsh-notify-sound`（或在 profile 的 `package.json` 里以 `file:` 依赖安装）。
2. 在 profile 的 `package.json` 的 `dsh.profile.bundles` 中加上 `dsh-notify-sound`。
3. 重启 DeepSeek Harness（新增客户端插件会改变启动清单）。之后改代码可用 dsh-unlag 的"换掉插件代码 / 重建页面"。

## 要求

- dsh >= 0.2.0-rc.1（Web / 桌面 GUI）
- 播放基于 Web Audio；受浏览器自动播放策略限制，首次点击 / 按键后才会解锁音频。

## 文件

- `index.js` — 宿主入口（no-op，仅用于让加载器登记本包的 `./client`）
- `client.js` — 浏览器插件：内嵌 Codex 音效 + 会话订阅 + 喇叭按钮
- `assets/codex-notification.wav` — 音效源资产（实际已内嵌进 `client.js`，仅供参考）
- `cordis.patch.yml` — 把本插件插入 profile 层栈
- `package.json` — 清单（`dsh.client` / `dsh.bundle`）

## 许可

本项目**代码**以 [MIT](LICENSE) 许可发布（`package.json` 中 `license: MIT`）。

> **音效版权说明**：`assets/codex-notification.wav` 提取自 OpenAI Codex 桌面应用，版权归 OpenAI 所有，**不在本项目的 MIT 许可范围内**。此处仅供本机互操作与个人研究使用；请勿将该音效单独再分发或用于商业用途。若权利人要求，可移除该资产（移除后插件会回退到内置合成音）。
