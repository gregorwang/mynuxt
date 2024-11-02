import { defineEventHandler, createError } from 'h3';
import fetch from 'node-fetch';

export default defineEventHandler(async (event) => {
  // 打印 API 密钥，检查是否加载成功
  console.log("Loaded ZHIPU_API_KEY:", process.env.ZHIPU_API_KEY);

  const { req, res } = event;
  const url = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
  const apiKey = ;
  
  // 检查密钥是否存在
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "API Key 未加载，请检查 .env 文件和配置"
    });
  }

  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "Accept": "text/event-stream"
  };

  const body = JSON.stringify({
    model: "glm-4",
    messages: [
      { role: "user", content: "你好，帮我介绍一下智谱AI开放平台的功能。" }
    ],
    temperature: 0.7,
    top_p: 0.9,
    max_tokens: 150,
    stream: true
  });

  // 继续实现您的 API 请求逻辑...
});


