export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const apiKey = process.env.ZHIYUAN_API_KEY; // 从环境变量中读取 API Key

  curl --location 'https://open.bigmodel.cn/api/paas/v4/chat/completions' \
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'glm-4',  // 指定模型名称
      messages: [
        {
          role: 'user',
          content: body.message
        }
      ]
    })
  });

  const data = await response.json();
  return data;
});



