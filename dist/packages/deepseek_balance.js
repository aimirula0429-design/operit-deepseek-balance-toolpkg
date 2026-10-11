"use strict";
/* METADATA
{
  "name": "deepseek_balance",
  "display_name": {
    "zh": "DeepSeek 余额查询",
    "en": "DeepSeek Balance"
  },
  "description": {
    "zh": "查询 DeepSeek 账户余额（货币、总余额、赠送、充值）。自动读取 Operit 已配置的 DeepSeek API Key，无需手动填写。",
    "en": "Query DeepSeek account balance (currency, total, granted, topped-up). Reads the DeepSeek API key configured in Operit automatically."
  },
  "enabled_by_default": true,
  "category": "System",
  "tools": [
    {
      "name": "get_deepseek_balance",
      "description": {
        "zh": "查询 DeepSeek 账户余额。会自动从 Operit 配置中读取 API Key。",
        "en": "Query DeepSeek account balance. The API key is read automatically from Operit's configuration."
      },
      "parameters": []
    }
  ]
}
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_deepseek_balance = get_deepseek_balance;
exports.usage_advice = usage_advice;

const SESSION_NAME = "deepseek_balance_query";

// 从 Operit 的 model_configs.preferences_pb 中提取 apiKey；其次读插件目录的 config.json
function buildShellScript() {
  return [
    `KEY="$(grep -ao 'sk-[A-Za-z0-9_-]\\{16,\\}' "/data/data/com.ai.assistance.operit/files/datastore/model_configs.preferences_pb" 2>/dev/null | head -1)"`,
    `if [ -z "$KEY" ]; then KEY="$(grep -ao 'sk-[A-Za-z0-9_-]\\{16,\\}' "/sdcard/Download/Operit/mcp/config.json" 2>/dev/null | head -1)"; fi`,
    `if [ -z "$KEY" ]; then echo "NO_KEY"; exit 0; fi`,
    `curl -sS --max-time 20 -H "Authorization: Bearer $KEY" -H "Accept: application/json" "https://api.deepseek.com/user/balance"`,
  ].join("\n");
}

function parseBalance(jsonText) {
  let data;
  try {
    data = JSON.parse(jsonText);
  } catch (e) {
    return { success: false, message: "返回内容无法解析：" + String(jsonText).slice(0, 300) };
  }
  if (data && data.error) {
    return { success: false, message: "DeepSeek 返回错误：" + (data.error.message || JSON.stringify(data.error)) };
  }
  const infos = Array.isArray(data.balance_infos) ? data.balance_infos : [];
  const lines = infos.map((b) => `货币 ${b.currency}｜总余额 ${b.total_balance}｜赠送 ${b.granted_balance}｜充值 ${b.topped_up_balance}`);
  const head = data.is_available ? "可用" : "不可用";
  return {
    success: true,
    message: `DeepSeek 账户状态：${head}\n` + (lines.length ? lines.join("\n") : "(无余额信息)"),
    is_available: !!data.is_available,
    balance_infos: infos,
  };
}

async function get_deepseek_balance() {
  try {
    const session = await Tools.System.terminal.create(SESSION_NAME);
    const sessionId = String(session && session.sessionId ? session.sessionId : "").trim();
    if (!sessionId) {
      return { success: false, message: "无法创建终端会话。" };
    }
    const script = buildShellScript();
    const result = await Tools.System.terminal.execStreaming(sessionId, script, { timeoutMs: 40000 });
    let output = "";
    if (result) {
      if (typeof result.output === "string") output = result.output;
      else if (typeof result.content === "string") output = result.content;
    }
    output = output.trim();
    if (!output) {
      return { success: false, message: "查询未返回内容，请检查网络或稍后重试。" };
    }
    if (output.indexOf("NO_KEY") !== -1) {
      return {
        success: false,
        message: "未找到 DeepSeek API Key。请先在 Operit 的模型设置里配置 DeepSeek，或在 /sdcard/Download/Operit/mcp/config.json 写入 {\"api_key\":\"sk-...\"}。",
      };
    }
    // 取最后一段 JSON（忽略可能的其它输出）
    const start = output.indexOf("{");
    const jsonText = start >= 0 ? output.slice(start) : output;
    return parseBalance(jsonText);
  } catch (e) {
    return { success: false, message: "查询失败：" + String(e && e.message ? e.message : e) };
  }
}

async function usage_advice() {
  return {
    success: true,
    message: "调用 get_deepseek_balance 即可查询 DeepSeek 账户余额，自动读取 Operit 中配置的 API Key。",
  };
}
