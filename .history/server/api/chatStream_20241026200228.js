import { defineEventHandler, createError } from 'h3';
import https from 'https';

export default defineEventHandler(async (event) => {
  const { req, res } = event;
  const url = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
  const apiKey = "39bfd2fc866473f0b2b90ce951bf25fe.lv72QR34L5Hzc4JE";

  console.log("Received request at /api/chatStream");  // 调试信息

  // 设置响应头
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "API Key 未加载，请检查配置"
    });
  }

  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Accept": "text/event-stream"
    }
  };

  const requestBody = JSON.stringify({
    model: "glm-4",
    messages: [
      { role: "user", content: "你好，帮我介绍一下智谱AI开放平台的功能。" }
    ],
    temperature: 0.7,
    top_p: 0.9,
    max_tokens: 150,
    stream: true
  });

  const externalReq = https.request(url, options, (externalRes) => {
    console.log("Connected to external API");

    externalRes.on("data", (chunk) => {
      console.log("Received data chunk from external API:", chunk.toString());  // 调试信息
      res.write(`data: ${chunk.toString()}\n\n`);
    });

    externalRes.on("end", () => {
      console.log("External API ended the stream");
      res.write("data: [DONE]\n\n");
      res.end();
    });
  });

  externalReq.on("error", (error) => {
    console.error("Error during API request:", error);
    throw createError({
      statusCode: 500,
      statusMessage: `请求发生错误: ${error.message}`
    });
  });

  externalReq.write(requestBody);
  externalReq.end();

  req.on("close", () => {
    console.log("Client closed the connection");
    res.end();
  });
});



