# Codex Bridge 产品网站

这里仅包含 Codex Bridge 的公开产品介绍网页：HTML、CSS、JavaScript 和网页图标。

**App 仍在开发中，暂未开放下载。此仓库不包含 App 源代码、安装包或软件发布历史。**

首页按「使命 → 两种用法 → 三步上手 → 开发状态」组织。重点介绍 VS Code 远程 Codex 插件，同时展示服务器 Codex CLI 的使用场景。网页中的连接为交互演示，不会建立真实 SSH 连接。

## 本地预览

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

## 发布

GitHub Pages 从 `main` 分支根目录发布。仅提交网页文件，禁止加入 App 源代码、安装包、下载目录或本机配置。

网站为 Codex Bridge 的独立产品页面，与 OpenAI 官方网站无关。
