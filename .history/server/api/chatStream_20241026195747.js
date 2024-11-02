import { defineEventHandler, createError } from 'h3';
import https from 'https';

export default defineEventHandler(async (event) => {
  const { req, res } = event;
  const url = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
  const apiKey = "39bfd2fc866473f0b2b90ce951bf25fe.lv72QR34L5Hzc4JE"; // 硬编码 API Key

  // 设置响应头，用于流式传输
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "API Key 未加载，请检查配置"
    });
  }

  // 配置请求参数
  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Accept": "text/event-stream"
    }
  };

  // 创建请求体
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

  // 发起 HTTPS 请求
  const externalReq = https.request(url, options, (externalRes) => {
    externalRes.on("data", (chunk) => {
      res.write(`data: ${chunk.toString()}\n\n`);
    });

    externalRes.on("end", () => {
      res.write("data: [DONE]\n\n");
      res.end();
    });
  });

  externalReq.on("error", (error) => {
    throw createError({
      statusCode: 500,
      statusMessage: `请求发生错误: ${error.message}`
    });
  });

  // 发送请求数据
  externalReq.write(requestBody);
  externalReq.end();

  // 处理客户端关闭连接
  req.on("close", () => {
    res.end();
  });
});



