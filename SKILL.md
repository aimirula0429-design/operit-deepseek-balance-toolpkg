---
name: DeepSeek 余额查询
description: 查询 DeepSeek 账户余额（货币、总余额、赠送、充值）。自动读取 Operit 已配置的 DeepSeek API Key，无需手动填写。适用于用户说"查 DeepSeek 余额/还剩多少钱/API 额度/balance"等场景。English: Query DeepSeek account balance, reading the API key configured in Operit automatically.
---
# DeepSeek 余额查询

在 Operit 中查询 DeepSeek 账户余额的工具插件。

## 功能
- 查询 DeepSeek 账户状态与余额：货币、总余额、赠送余额、充值余额
- 自动读取 Operit 已配置的 DeepSeek API Key，无需手动输入

## 使用
1. 确保 Operit 的模型设置里已配置 DeepSeek（含 API Key）。
2. 让助手调用工具 `get_deepseek_balance`，或直接说"查一下 DeepSeek 余额"。

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

## Key 来源优先级
1. Operit 配置：`/data/data/com.ai.assistance.operit/files/datastore/model_configs.preferences_pb`
2. 备用：`/sdcard/Download/Operit/mcp/config.json` 的 `api_key`

## 说明
- 调用 DeepSeek 官方接口 `https://api.deepseek.com/user/balance`
- 不存储、不上传任何密钥
- MIT License