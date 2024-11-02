// server/api/chat.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event); // 获取请求体中的用户消息
  const apiKey = process.env.ZHIYUAN_API_KEY; // 从环境变量中读取API Key

  const response = await fetch('https://api.zhiyuan.com/v1/your-endpoint', {  // 使用真实的API URL
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: body.message,
      max_tokens: 50,  // 根据需求配置
    }),
  });

  const data = await response.json(); // 获取返回的JSON数据
  return data; // 将API响应返回给前端
});



