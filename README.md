# dsh-notify-sound

给 dsh（DeepSeek Harness 桌面 / Web）用的**消息提示音**插件，复刻 Codex 的"任务完成响一声"体验。

**声音就是本机 Codex 自带的提示音**：`codex-notification.wav`（取自本机 Codex 桌面版，已内嵌为 base64，自包含、无需外部音频文件）。

- **一轮回复完成**时响：窗口在后台/不聚焦，或完成的是你没在看的会话时必响；你正盯着当前会话时不打扰。
- **需要你介入**时响：出现授权/审批、向你提问、计划确认等交互时，**总是响**（哪怕在前台，因为需要你操作），并把同一提示音连响两下以更醒目。
- 自动过滤 subagent 子任务，避免频繁打扰。

## 配置

会话头部工具区有一个小喇叭按钮：

- **左键**：一键静音 / 开启。
- **右键**：打开设置
  - 完成时：后台时（默认）/ 总是 / 关闭
  - 需要授权/回答时：开（默认）/ 关
  - 两类用不同音：开（默认 = 完成单击、需介入双击）/ 关
  - 音量：0–100%
  - 试听

配置保存在浏览器 localStorage（键 `dsh-notify-sound:cfg`），按源站持久化。

## 安装

1. 插件包放在 profile 的 `node_modules/dsh-notify-sound`（或在 profile 的 `package.json` 里以 `file:` 依赖安装）。
2. profile 的 `package.json` 的 `dsh.profile.bundles` 中加入 `dsh-notify-sound`。
3. 重启 DeepSeek Harness（新增客户端插件会改变启动清单）；改代码时可用 dsh-unlag 的"换掉插件代码/重建页面"。

本包通过 `dsh.client` 声明自己是一个 web 客户端插件；宿主入口 `index.js` 是空 `apply()`，只用于让加载器登记本包并把 `./client` 发布到浏览器。

## 文件

- `index.js` — 宿主入口（no-op）
- `client.js` — 浏览器插件（内嵌 Codex 音效 + 会话订阅 + 喇叭按钮）
- `assets/codex-notification.wav` — 音效源资产（仅供参考，实际已内嵌进 client.js）
- `cordis.patch.yml` — 把本插件插入 profile 层栈
- `package.json` — 清单（`dsh.client` / `dsh.bundle`）
