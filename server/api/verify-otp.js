// server/api/verify-otp.js

import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { phoneNumber, otpCode } = body;

  // 这里可以进行 OTP 验证的逻辑
  // 例如：从数据库中查找用户并验证 OTP

  return { success: true, message: 'OTP 验证成功' };
});
