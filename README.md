# DeepSeek 余额查询（Operit ToolPkg）

在 Operit 中一键查看 DeepSeek 账户余额的工具包（ToolPkg）。

## 功能
- 工具 `get_deepseek_balance`：查询 DeepSeek 账户状态与余额（货币、总余额、赠送、充值）
- **自动读取 Operit 已配置的 DeepSeek API Key**，无需手动填写

## 安装
在 Operit 的插件/工具包商店中，通过本仓库导入安装。

## 结构
```
manifest.json                          # 工具包清单
dist/main.js                           # 入口（空注册）
dist/packages/deepseek_balance.js      # 工具实现（METADATA + get_deepseek_balance）
```

## Key 来源优先级
1. Operit 配置：`/data/data/com.ai.assistance.operit/files/datastore/model_configs.preferences_pb`
2. 备用：`/sdcard/Download/Operit/mcp/config.json` 的 `api_key`

## 说明
- 仅使用标准 curl 调用 DeepSeek 官方余额接口 `https://api.deepseek.com/user/balance`
- 不存储、不上传任何密钥

MIT License
