import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import OpenApiUtil from '@alicloud/openapi-util';
import Util, * as $Util from '@alicloud/tea-util';
import * as $tea from '@alicloud/tea-typescript';

export default class Client {
  /**
   * 使用 AK&SK 初始化账号 Client
   * @returns OpenApi 实例
   */
  static createClient(runtimeConfig: any): OpenApi {
    const config = new $OpenApi.Config({
      accessKeyId: runtimeConfig.ALIBABA_CLOUD_ACCESS_KEY_ID,
      accessKeySecret: runtimeConfig.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
    });
    config.endpoint = `dysmsapi.aliyuncs.com`;
    return new OpenApi(config);
  }

  /**
   * 发送短信的方法
   */
  static async sendSms(
    runtimeConfig: any,
    phoneNumber: string, 
    signName: string, 
    templateCode: string, 
    templateParam: string
  ) {
    try {
      const client = this.createClient(runtimeConfig);
      const params = new $OpenApi.Params({
        action: "SendSms",
        version: "2017-05-25",
        protocol: "HTTPS",
        method: "POST",
        authType: "AK",
        style: "RPC",
        pathname: `/`,
        reqBodyType: "json",
        bodyType: "json",
      });

      const queries: { [key: string]: any } = {
        PhoneNumbers: phoneNumber,
        SignName: signName,
        TemplateCode: templateCode,
        TemplateParam: templateParam,
      };

      const runtime = new $Util.RuntimeOptions({});
      const request = new $OpenApi.OpenApiRequest({
        query: OpenApiUtil.query(queries),
      });

      const response = await client.callApi(params, request, runtime);
      return { 
        success: true, 
        data: response.body 
      };
    } catch (error: any) {
      console.error("Error sending SMS:", error);
      return { 
        success: false, 
        error: error.message || "发送短信失败，请稍后重试。" 
      };
    }
  }
}

