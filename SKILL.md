---
name: DeepSeek 余额查询
description: 查询 DeepSeek 账户余额（货币、总余额、赠送、充值），自动读取 Operit 已配置的 DeepSeek API Key，无需手动填写。适用于用户说"查 DeepSeek 余额 / 还剩多少钱 / API 额度 / 账户余额 / balance / 充值到账确认"等场景。English: Query DeepSeek account balance (currency, total, granted, topped-up), reading the API key configured in Operit automatically. Use when the user asks for "DeepSeek balance / how much is left / API quota / account balance".
---
# DeepSeek 余额查询

在 Operit 中一键查询你的 DeepSeek 账户余额，随时掌握 API 花费还剩多少。

## ✨ 功能特点

- **一键查余额**：调用工具 `get_deepseek_balance`，立刻返回账户状态与余额明细
- **自动读取 API Key**：无需任何手动配置，自动从 Operit 已配置的 DeepSeek 模型中获取密钥
- **明细完整**：返回货币类型、总余额、赠送余额、充值余额
- **零依赖**：仅调用 DeepSeek 官方接口，不需要额外安装任何东西
- **安全**：不存储、不上传任何密钥信息

## 📊 返回内容示例

```
DeepSeek 账户状态：可用
货币 CNY｜总余额 6.40｜赠送 0.00｜充值 6.40
```

## 🚀 使用方法

1. 确保 Operit 的「模型设置」中已配置好 DeepSeek（含 API Key）
2. 对助手说："**查一下 DeepSeek 余额**"，或直接让助手调用 `get_deepseek_balance` 工具
3. 即可看到账户余额明细

## 🔑 API Key 来源（自动，按优先级）

1. Operit 配置：`/data/data/com.ai.assistance.operit/files/datastore/model_configs.preferences_pb`
2. 备用：`/sdcard/Download/Operit/mcp/config.json` 中的 `api_key` 字段

## ⚙️ 技术说明

- 调用 DeepSeek 官方余额接口：`https://api.deepseek.com/user/balance`
- 通过 Operit 终端执行标准 curl 请求
- 工具名：`get_deepseek_balance`；无需参数

## 📁 仓库结构

```
SKILL.md                          # 技能说明（Operit 识别入口）
manifest.json                     # 工具包清单
dist/main.js                      # 入口
dist/packages/deepseek_balance.js # 工具实现
```

## 安装配置（MCP JSON，可选）

```json
{
  "mcpServers": {
    "deepseek-balance": {
      "command": "python3",
      "args": ["/sdcard/Download/Operit/mcp/deepseek_balance.py"]
    }
  }
}
```

## 🏷️ 关键词

DeepSeek、余额、查余额、API 额度、账户余额、balance、还剩多少钱、充值

---
MIT License · 作者：aimirula0429-design