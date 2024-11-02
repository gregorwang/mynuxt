export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const apiKey = process.env.ZHIYUAN_API_KEY;

  const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'glm-4',
      messages: [
        {
          role: 'user',
          content: body.message
        }
      ]
    })
  });

  const data = await response.json();

  // 输出 API 返回的数据到控制台，便于调试
  console.log("API 响应数据:", data);

  // 检查返回的数据是否符合预期
  if (!data || !data.choices || !data.choices[0]) {
    throw new Error("API 响应格式错误或数据缺失");
  }

  return data;
});




