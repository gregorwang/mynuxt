import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const { phone, code } = await readBody(event);

  try {
    // 这里应该实现验证码验证逻辑
    // 通常需要与之前存储的验证码进行比对
    
    // 示例实现（仅用于测试）
    // 在实际应用中，应该检查存储的验证码
    const isValid = code === '123456'; // 测试验证码

    if (isValid) {
      return {
        success: true,
        data: {
          token: 'dummy-token-' + Date.now()
        }
      };
    } else {
      return {
        success: false,
        error: '验证码错误'
      };
    }
  } catch (error) {
    console.error('Verification error:', error);
    return {
      success: false,
      error: '验证失败，请重试'
    };
  }
}); 