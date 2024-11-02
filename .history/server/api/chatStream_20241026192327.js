import { defineEventHandler, createError, useRuntimeConfig } from 'h3';
import fetch from 'node-fetch';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.ZHIPU_API_KEY;

  // 检查 API 密钥是否加载成功
  console.log("Loaded ZHIPU_API_KEY:", apiKey);
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "API Key 未加载，请检查 .env 文件和配置"
    });
  }

  // 继续实现 API 调用逻辑
  const url = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
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

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body
    });

    if (!response.ok) {
      throw new Error(`智谱AI请求失败：${response.statusText}`);
    }

    event.node.res.setHeader("Content-Type", "text/event-stream");
    for await (const chunk of response.body) {
      event.node.res.write(`data: ${chunk}\n\n`);
    }
    event.node.res.end();
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `接口调用失败: ${error.message}`
    });
  }
});


