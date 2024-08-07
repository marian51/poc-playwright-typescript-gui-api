export class Endpoint {
  // --------- COMMENTS ---------

  public static taskComment(taskId: string) {
    return `/api/v2/task/${taskId}/comment`;
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

  public static addViewComment(viewId: string) {
    return `/api/v2/view/${viewId}/comment`;
  }

  // --------- GOALS ---------

  public static teamGoals() {
    return `/api/v2/team/${process.env.BASE_TEAM_ID}/goal`;
  }

  public static goal(goalId: string) {
    return `/api/v2/goal/${goalId}`;
  }

  // --------- SPACES ---------

  public static teamSpaces() {
    return `/api/v2/team/${process.env.BASE_TEAM_ID}/space`;
  }

  public static space(spaceId: string) {
    return `/api/v2/space/${spaceId}`;
  }

  // --------- TASKS ---------

  public static listTask(listId: string) {
    return `/api/v2/list/${listId}/task`;
  }

  public static task(taskId: string) {
    return `/api/v2/task/${taskId}`;
  }

  // --------- DOCS ---------

  public static teamDocs() {
    return `/api/v3/workspaces/${process.env.BASE_TEAM_ID}/docs`;
  }

  public static deleteDocs() {
    return "https://prod-eu-west-1-3.clickup.com/viz/v1/view";
  }

  // --------- LISTS ---------

  public static list(listId: string) {
    return `/api/v2/list/${listId}`;
  }

  public static folderlessList(spaceId: string) {
    return `/api/v2/space/${spaceId}/list`;
  }

  public static folderList(folderId: string) {
    return `/api/v2/folder/${folderId}/list`;
  }

  // --------- FOLDERS ---------

  public static folder(folderId: string) {
    return `/api/v2/folder/${folderId}`;
  }

  public static spaceFolder(spaceId: string) {
    return `/api/v2/space/${spaceId}/folder`;
  }

  // --------- VIEWS ---------

  public static teamView() {
    return `/api/v2/team/${process.env.BASE_TEAM_ID}/view`;
  }

  public static view(viewId: string) {
    return `/api/v2/view/${viewId}`;
  }
}
