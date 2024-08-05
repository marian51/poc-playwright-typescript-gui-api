import { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiService {
  public static async postWithData(endpoint: string, data, request: APIRequestContext): Promise<APIResponse> {
    return await request.post(endpoint, { data });
  }

  public static async putWithData(endpoint: string, data, request: APIRequestContext): Promise<APIResponse> {
    return await request.put(endpoint, { data });
  }

  public static async delete(endpoint: string, request: APIRequestContext): Promise<APIResponse> {
    return await request.delete(endpoint);
  }
  
  public static async get(endpoint: string, request: APIRequestContext): Promise<APIResponse> {
    return await request.get(endpoint);
  }
}
