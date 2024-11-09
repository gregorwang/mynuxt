// composables/useSms.ts
import { ref } from 'vue';

interface SmsResponse {
  success: boolean;
  error?: string;
}

export const useSms = () => {
  const loading = ref(false);  
  const error = ref<string | null>(null); 

  const sendSms = async (phoneNumber: string, templateCode: string, templateParam: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<SmsResponse>('/api/sendSms', {
        method: 'POST',
        body: {
          phoneNumber,
          templateCode,
          templateParam,
        },    
      });

      if (response.success) {
        return { success: true };
      } else {
        error.value = response.error || '发送验证码失败，请检查手机号。';
        return { success: false, error: error.value };
      }
    } catch (err) {
      error.value = '发送验证码失败，请稍后再试。';
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    sendSms,
  };
};


