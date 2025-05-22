import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const { phone } = await readBody(event);

  try {
    // 这里应该实现发送验证码的逻辑
    // 通常需要调用短信服务提供商的API
    
    // 示例实现（仅用于测试）
    // 在实际应用中，应该生成随机验证码并发送短信
    const code = '123456'; // 测试验证码
    
    console.log(`向 ${phone} 发送验证码: ${code}`);
    
    return {
      success: true,
      message: '验证码已发送'
    };
  } catch (error) {
    console.error('Send SMS error:', error);
    return {
      success: false,
      error: '发送验证码失败'
    };
  }
});