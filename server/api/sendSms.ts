import { defineEventHandler, readBody } from 'h3';
import Client from '../../services/client';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  
  try {
    const { phoneNumber, templateCode, templateParam } = await readBody(event);

    const result = await Client.sendSms(
      config,
      phoneNumber,
      "汪家俊的个人网站",
      templateCode,
      templateParam
    );

    return result;
  } catch (error: any) {
    console.error("Error in sendSms API:", error);
    return {
      success: false,
      error: error.message || "发送短信失败，请稍后重试。"
    };
  }
});


