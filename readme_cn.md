# AI Alibis：多智能体 LLM 谋杀之谜

**[在线游玩](https://ai-murder-mystery.onrender.com)**
<div align="center">
<a href="https://ai-murder-mystery.onrender.com/" target="_blank">
<img alt="AI Alibis Logo" src="web/src/assets/screenshot.png" max-width="80%">
</div>
</a>

## 本地部署

1. 克隆仓库
```
git clone https://github.com/ironman5366/ai-murder-mystery-hackathon.git
cd ai-murder-mystery-hackathon
```

2. 在 `api/.env` 中添加你的 API 密钥（可选：通过 `DB_CONN_URL="postgresql://数据库地址"` 将对话记录到 Postgres）

支持的推理服务：`anthropic`、`openai`、`groq`、`openrouter`、`ollama`、`deepseek`

```
INFERENCE_SERVICE=deepseek
API_KEY="你的API密钥"
MODEL=deepseek-v4-flash
MAX_TOKENS=1000
```

3. 安装 Node 依赖
```
cd web && npm install
```

4. 启动 API
```
cd api && pip install -r requirements.txt && python main.py
```

Windows 用户也可使用：
```
.\restart-dev.ps1
```

5. 另开终端，启动前端界面
```
cd web && npm start
```

6. 在浏览器中打开 http://localhost:3000/ 开始游戏！

## 使用 Docker 部署

1. 克隆仓库
```
git clone https://github.com/ironman5366/ai-murder-mystery-hackathon.git
cd ai-murder-mystery-hackathon
```

2. 设置环境变量（完整选项见 [api/.env.example](api/.env.example)）
```
export INFERENCE_SERVICE=deepseek
export API_KEY="你的API密钥"
export MODEL=deepseek-v4-flash
```

3. 在包含 README 的目录中运行：
```
docker compose up
```

这将启动三个容器（数据库、Python API 和 React 前端），并创建持久化数据库卷。

4. 在 http://localhost:3000/ 游玩

修改文件后重建镜像：
```
docker compose up --build
```

5. 停止服务：按 `CTRL-C` 或在 Docker GUI 中点击停止按钮。清理时删除所有容器和关联的数据库卷。

## 运行测试

**前端**（React / Vitest）：
```
cd web && npm test
```

**后端**（Python / pytest）：
```
cd api && pytest
```

## 更多信息

完整的谋杀故事见 [web/src/characters.json](https://github.com/ironman5366/ai-murder-mystery-hackathon/blob/main/web/src/characters.json)，包含提供给每个角色的完整上下文。

提示系统（包括评论与修订机制）的实现见 [api/ai.py](https://github.com/ironman5366/ai-murder-mystery-hackathon/blob/main/api/ai.py)。

Twitter 相关推文：https://x.com/humanscotti/status/1810777932568399933

## 多语言支持

前端界面支持国际化，默认英语和简体中文。语言根据浏览器设置自动检测，也可通过右上角的下拉菜单手动切换。

角色名称和简介已翻译为两种语言。AI 的回复语言会跟随用户选择的界面语言。

添加新语言：在 `web/src/i18n/locales/` 中添加翻译文件，并在 `web/src/i18n/i18n.ts` 中注册。

## 联系方式

AI Alibis 由 [Paul Scotti](https://paulscotti.github.io/) 和 [Will Beddow](https://www.willbeddow.com/) 创作。
