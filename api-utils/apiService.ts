import { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiService {
  public static async postWithData(request: APIRequestContext, endpoint: string, data): Promise<APIResponse> {
    return await request.post(endpoint, data);
  }
}
