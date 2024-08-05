export class Endpoint {
  private static readonly API_V1 = "/api/v1";
  private static readonly API_V2 = "/api/v2";

  public static addTaskComment(taskId: string, apiVersion?: string) {
    const api = apiVersion ?? Endpoint.API_V2;
    return `${api}/task/${taskId}/comment`;
  }
}
