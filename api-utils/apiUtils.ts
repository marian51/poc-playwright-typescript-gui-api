import { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiUtils {

  public static async getSpaceIdByName(request: APIRequestContext, spaceName: string): Promise<string> {
    const apiKey: string = process.env.API_KEY as string;
    const teamId: string = process.env.BASE_TEAM_ID as string;
    const getSpacesEndpoint: string = `https://api.clickup.com/api/v2/team/${teamId}/space`;

    const getSpacesResponse: APIResponse = await request.get(getSpacesEndpoint, { headers: { Authorization: apiKey } });
    const spaceId: string = (await getSpacesResponse.json()).spaces.filter((space) => space.name === spaceName)[0].id;

    return spaceId;
  }

  public static async getFolderIdByName(request: APIRequestContext, spaceName: string, folderName: string): Promise<string> {
    const apiKey: string = process.env.API_KEY as string;
    const spaceId: string = await this.getSpaceIdByName(request, spaceName);
    const getFoldersEndpoint: string = `https://api.clickup.com/api/v2/space/${spaceId}/folder`;

    const getFoldersResponse: APIResponse = await request.get(getFoldersEndpoint, { headers: { Authorization: apiKey } });
    const folderId: string = (await getFoldersResponse.json()).folders.filter((folder) => folder.name === folderName)[0].id;

    return folderId;
  }

  public static async getListIdByName(request: APIRequestContext, spaceName: string, folderName: string, listName: string): Promise<string> {
    const apiKey: string = process.env.API_KEY as string;
    const folderId: string = await this.getFolderIdByName(request, spaceName, folderName);
    const getListsEndpoint: string = `https://api.clickup.com/api/v2/folder/${folderId}/list`;

    const getListsResponse: APIResponse = await request.get(getListsEndpoint, { headers: { Authorization: apiKey } });
    const listId: string = (await getListsResponse.json()).lists.filter((list) => list.name === listName)[0].id;

    return listId;
  }

  // Obtains id of a base list for task tests - Team Space/Projects/Project 1
  public static async getTaskIdFromBaseList(request: APIRequestContext, taskName: string): Promise<string> {
    // TODO: move base names to separate class or dictionary
    const apiKey: string = process.env.API_KEY as string;
    const baseSpaceName: string = "Team Space";
    const baseFolderName: string = "Projects";
    const baseListName: string = "Project 1";
    const baseListId: string = await this.getListIdByName(request, baseSpaceName, baseFolderName, baseListName);
    const getTasksEndpoint: string = `https://api.clickup.com/api/v2/list/${baseListId}/task`;

    const getTasksResponse: APIResponse = await request.get(getTasksEndpoint, { headers: { Authorization: apiKey } });
    const taskId: string = (await getTasksResponse.json()).tasks.filter((task) => task.name === taskName)[0].id;
    
    return taskId;
  }

  public static async getBaseFolderId(request: APIRequestContext): Promise<string> {
    // TODO: move base names to separate class or dictionary
    const baseSpaceName: string = "Team Space";
    const baseFolderName: string = "Projects";
    return await this.getFolderIdByName(request, baseSpaceName, baseFolderName);
  }

  public static async getBaseListId(request: APIRequestContext): Promise<string> {
    // TODO: move base names to separate class or dictionary
    const baseSpaceName: string = "Team Space";
    const baseFolderName: string = "Projects";
    const baseListName: string = "Project 1";
    return await this.getListIdByName(request, baseSpaceName, baseFolderName, baseListName);
  }
}
