// server/api/chatStream.js
import { defineEventHandler, createError } from 'h3';
import fetch from 'node-fetch';

export default defineEventHandler(async (event) => {
  const { req, res } = event;

  // 设置智谱AI API的URL和请求头
  const url = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
  const apiKey = process.env.ZHIPU_API_KEY; // 在.env文件中存放您的API密钥
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "Accept": "text/event-stream" // 指定流式输出的格式
  };

  // 构造请求体
  const body = JSON.stringify({
    model: "glm-4",
    messages: [
      { role: "user", content: "你好，帮我介绍一下智谱AI开放平台的功能。" }
    ],
    temperature: 0.7,
    top_p: 0.9,
    max_tokens: 150,
    stream: true // 启用流式输出
  });

  try {
    // 发起请求到智谱AI接口
    const response = await fetch(url, {
      method: "POST",
      headers,
      body
    });

    if (!response.ok) {
      throw new Error(`智谱AI请求失败：${response.statusText}`);
    }

    // 设置响应头以支持流式传输
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // 监听和传输流式数据
    for await (const chunk of response.body) {
      const textChunk = chunk.toString();
      res.write(`data: ${textChunk}\n\n`);
    }
    
    // 结束响应
    res.end();

  } catch (error) {
    // 处理错误
    throw createError({
      statusCode: 500,
      statusMessage: `接口调用失败: ${error.message}`
    });
  }
});
