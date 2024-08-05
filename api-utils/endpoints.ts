export class Endpoint {
  private static readonly API_V1 = "/api/v1";
  private static readonly API_V2 = "/api/v2";

  public static addTaskComment(taskId: string, apiVersion?: string) {
    const api = apiVersion ?? Endpoint.API_V2;
    return `${api}/task/${taskId}/comment`;
  }

  public static comment(commentId: string) {
    return `/api/v2/comment/${commentId}`;
  }

  public static commentReply(commentId: string) {
    return `/api/v2/comment/${commentId}/reply`;
  }

  public static listComment(listId: string) {
    return `/api/v2/list/${listId}/comment`;
  }

  public static chatViewComment(chatViewId: string) {
    return `/api/v2/view/${chatViewId}/comment`;
  }

  public static teamGoals() {
    return `/api/v2/team/${process.env.BASE_TEAM_ID}/goal`;
  }

  public static goal(goalId: string) {
    return `/api/v2/goal/${goalId}`;
  }
}
