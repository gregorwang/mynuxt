import { defineEventHandler, createError } from 'h3';
import fetch from 'node-fetch';


export default defineEventHandler(async (event) => {
export default defineEventHandler(async (event) => {
    const { req, res } = event;
  
    // 设置 HTTP 头，声明流式传输
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
  
    // 模拟流式数据，每秒发送一条数据
    const intervalId = setInterval(() => {
      const message = { content: "这是流式响应数据" };
      res.write(`data: ${JSON.stringify(message)}\n\n`);
    }, 1000);
  
    // 当连接关闭时，停止发送
    req.on("close", () => {
      clearInterval(intervalId);
      res.end();
    });
  });
  console.log("Loaded ZHIPU_API_KEY:", process.env.ZHIPU_API_KEY);

  const { req, res } = event;
  const url = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
  const apiKey = "39bfd2fc866473f0b2b90ce951bf25fe.lv72QR34L5Hzc4JE";  // 直接硬编码 API Key

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "API Key 未加载，请检查配置"
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

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body
    });

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `请求失败: ${response.statusText}`
      });
    }

    return response.body;  // 如果是流式传输，可能需要进一步处理
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `请求发生错误: ${error.message}`
    });
  }
});


