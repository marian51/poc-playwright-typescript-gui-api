import { APIRequestContext, APIResponse } from "@playwright/test";
import { apiTryCatch } from "../utils/decorators";
import { Endpoint } from "./endpoints";
import { API_KEY } from "../resources/constants";

export class ApiUtils {

  @apiTryCatch("Space")
  public static async getSpaceIdByName(request: APIRequestContext, spaceName: string): Promise<string> {
    const getSpacesResponse: APIResponse = await request.get(Endpoint.teamSpaces(), { headers: { Authorization: API_KEY } });
    const spaceId: string = (await getSpacesResponse.json()).spaces.filter((space) => space.name === spaceName)[0].id;

    return spaceId;
  }

  @apiTryCatch("Folder")
  public static async getFolderIdByName(request: APIRequestContext, spaceName: string, folderName: string): Promise<string> {
    const spaceId: string = await this.getSpaceIdByName(request, spaceName);

    const getFoldersResponse: APIResponse = await request.get(Endpoint.spaceFolder(spaceId), { headers: { Authorization: API_KEY } });
    const folderId: string = (await getFoldersResponse.json()).folders.filter((folder) => folder.name === folderName)[0].id;

    return folderId;
  }

  @apiTryCatch("List")
  public static async getListIdByName(request: APIRequestContext, spaceName: string, folderName: string, listName: string): Promise<string> {
    const folderId: string = await this.getFolderIdByName(request, spaceName, folderName);

    const getListsResponse: APIResponse = await request.get(Endpoint.folderList(folderId), { headers: { Authorization: API_KEY } });
    const listId: string = (await getListsResponse.json()).lists.filter((list) => list.name === listName)[0].id;

    return listId;
  }

  // TODO: OBSOLETE METHOD, verify it can be safely removed
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
    try {
      const taskId: string = (await getTasksResponse.json()).tasks.filter((task) => task.name === taskName)[0].id;
      return taskId;
    } catch (error) {
      if (error instanceof TypeError) {
        console.error("Task with given name was not found!", error.message);
      } else {
        console.error("Unexpected error occurred while trying to obtain an id!", error.message);
      }
      return "";
    }
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

  /**
   * Api function for getting id strings of all docs with given name
   * @param request Typical `request` object taken from Playwright
   * @param docName Name of doc (or docs), which will be deleted, eq. "*Practical Fresh Fish*"
   * @returns Array of IDs of docs with given name, eq. `["8cnhpru-2975", "8cnhpru-3055", "8cnhpru-3095"]`
   */
  @apiTryCatch("Doc")
  public static async getDocIdsByName(request: APIRequestContext, docName: string) {
    const apiKey: string = process.env.API_KEY as string;

    const getAllDOcsResponse: APIResponse = await request.get(Endpoint.teamDocs(), { headers: { Authorization: apiKey } });
    const docsArray = (await getAllDOcsResponse.json()).docs.filter((doc) => doc.name === docName);
    const docsId: string[] = docsArray.map(doc => doc.id)

    return docsId;
  }
}
