import { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiService {
  public static async postWithData(endpoint: string, data, request: APIRequestContext): Promise<APIResponse> {
    return await request.post(endpoint, { data });
  }
}
