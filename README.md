# dsh-notify-sound

> dsh（DeepSeek Harness）的消息提示音插件。播放的是 **OpenAI Codex 自带的完成提示音**（`codex-notification.wav`），不是自造音效。

一轮 AI 回复结束时，或应用需要你介入（授权 / 审批 / 提问 / 计划确认）时，在 dsh 的 Web / 桌面界面里播放 Codex 那声清脆的“叮”。

仓库：<https://github.com/anze225/dsh-notify-sound>

## 功能

- **Codex 原生音效**：`codex-notification.wav` 取自本机 Codex 桌面版（48 kHz、约 0.57 s 的明亮短叮），以 base64 内嵌在 `client.js` 中，自包含，无需外部音频文件。
- **两类触发**
  - **回复完成**：窗口在后台 / 不聚焦，或完成的是你没在看的会话时响；你正盯着当前会话时默认不打扰。
  - **需要你介入**（授权 / 审批 / 提问 / 计划确认）：默认必响，并把同一提示音连响两下以更醒目。
- **不打扰**：自动忽略 subagent 子会话；可一键静音。
- **可配置**：完成时机、需介入提醒、两类区分、音量。

## 安装

作为一个 dsh 的 profile 插件（web 客户端插件）安装：

1. 把本包放到 profile 的 `node_modules/dsh-notify-sound`（或在 profile 的 `package.json` 里以 `file:` 依赖安装）。
2. 在 profile 的 `package.json` 的 `dsh.profile.bundles` 中加入 `dsh-notify-sound`。
3. 重启 DeepSeek Harness（新增客户端插件会改变启动清单）。
   之后修改代码，可用 dsh-unlag 的“换掉插件代码 / 重建页面”使其生效。

## 使用

会话顶部（标题栏右侧）的工具栏里有一个小喇叭按钮：

- **左键**：静音 / 开启。
- **右键**：打开设置菜单。

### 设置项

| 设置 | 默认 | 说明 |
| --- | --- | --- |
| 完成时 | 仅后台时 | 回复完成时何时响：仅后台时 / 总是 / 关闭 |
| 需要授权 / 回答时 | 开 | 出现授权、审批、提问、计划确认等交互时提醒 |
| 两类用不同音 | 开 | 完成＝单击；需介入＝同一提示音连响两下 |
| 音量 | 78% | 0–100% 可调 |
| 试听 | — | 立即播放一次完成提示音 |

配置保存在浏览器 `localStorage` 的 `dsh-notify-sound:cfg` 键中。

## 兼容性

- dsh：`>= 0.2.0-rc.1 < 0.3.0`（已在 `0.2.2-rc.1` 验证）。
- 播放基于 Web Audio；受浏览器自动播放策略限制，需先有一次点击 / 按键才会解锁音频。

## 文件

- `index.js` — 宿主入口（空实现，仅用于让加载器登记本包的 `./client`）。
- `client.js` — 浏览器插件：内嵌 Codex 音效 + 会话状态订阅 + 喇叭按钮。
- `assets/codex-notification.wav` — 音效源文件（已内嵌进 `client.js`，此处仅作留存）。
- `cordis.patch.yml` — 把本插件插入 profile 的插件层。
- `package.json` — 清单（`dsh.client` / `dsh.bundle`）。
- `LICENSE` — MIT 许可。

## 许可

本项目**代码**以 [MIT](LICENSE) 许可发布（`package.json` 中 `license: MIT`）。

> **音效版权说明**：`codex-notification.wav` 提取自 OpenAI Codex 桌面应用，版权归 OpenAI 所有，**不在本项目的 MIT 许可范围内**，仅供本机互操作与个人研究使用；请勿将该音效单独再分发或用于商业用途。
>
> 说明：音效实际以 base64 **内嵌在 `client.js` 中**，`assets/` 里的同名文件只是留存副本。若要在发布物中彻底移除该音效，需要重新生成不含内嵌音频的 `client.js`（此时播放会回退到内置合成音）；仅删除 `assets/` 文件并不会改变实际声音。

## 开发

- 无构建步骤：`client.js` 以 `window.__ModuleLoader__.load(...)` 直接提供，仅依赖宿主的 `react`。
- 修改后可用 dsh-unlag 刷新或重启应用。
