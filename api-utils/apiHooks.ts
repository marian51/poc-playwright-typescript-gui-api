import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { ApiUtils } from "./apiUtils";
import { GenerateData } from "./generateBody";
import { faker } from "@faker-js/faker";
import { Endpoint } from "./endpoints";

export class ApiHooks {
  public static async deleteSpaceByName(request: APIRequestContext, spaceName: string) {
    const apiKey: string = process.env.API_KEY as string;

    // Getting all existing spaces
    const allSpacesResponse = await request.get(Endpoint.teamSpaces(), {
      headers: { Authorization: apiKey },
    });

    // Finding space id
    const spaceId = (await allSpacesResponse.json()).spaces.filter((space) => space.name === spaceName)[0].id;

    // Deleting space by id
    await request.delete(Endpoint.space(spaceId), {
      headers: { Authorization: apiKey },
    });
  }

  public static async createSpaceByName(request: APIRequestContext, spaceName: string) {
    const apiKey: string = process.env.API_KEY as string;

    // Creating new space
    const newSpaceBody = {
      name: spaceName,
    };

    // Posting new space
    const response = await request.post(Endpoint.teamSpaces(), { headers: { Authorization: apiKey }, data: newSpaceBody });
  }

  public static async createNewTask(request: APIRequestContext, taskName: string, taskListId?: string) {
    const listId: string = taskListId ?? (await ApiUtils.getBaseListId(request));
    const apiKey: string = process.env.API_KEY as string;

    const newTaskBody = {
      name: taskName,
    };

    const response = await request.post(Endpoint.listTask(listId), { headers: { Authorization: apiKey }, data: newTaskBody });
    return response;
  }

  public static async createNewTaskWithData(request: APIRequestContext, taskData: Object) {
    const taskListId: string = await ApiUtils.getBaseListId(request);
    const apiKey: string = process.env.API_KEY as string;

    const response = await request.post(Endpoint.listTask(taskListId), { headers: { Authorization: apiKey }, data: taskData });
  }

  public static async deleteTask(request: APIRequestContext, taskName: string) {
    const taskId = await ApiUtils.getTaskIdFromBaseList(request, taskName);
    const apiKey: string = process.env.API_KEY as string;

    await request.delete(Endpoint.task(taskId), { headers: { Authorization: apiKey, "Content-Type": "application/json" } });
  }

  public static async deleteTaskById(request: APIRequestContext, taskId: string) {
    const apiKey: string = process.env.API_KEY as string;

    await request.delete(Endpoint.task(taskId), { headers: { Authorization: apiKey, "Content-Type": "application/json" } });
  }

  public static async deleteAllTasksFromList(request: APIRequestContext, listId: string) {
    const apiKey: string = process.env.API_KEY as string;

    const tasks = await request.get(Endpoint.listTask(listId), { headers: { Authorization: apiKey } });
    const taskIds = (await tasks.json()).tasks.map((task) => task.id);

    for (const taskId of taskIds) {
      await request.delete(Endpoint.task(taskId), { headers: { Authorization: apiKey } });
    }
  }

  public static async createRandomGoal(request: APIRequestContext): Promise<APIResponse> {
    const preparedGoalBody = GenerateData.getRandomGoal();
    const response = await request.post(Endpoint.teamGoals(), { data: preparedGoalBody });

    return response;
  }

  public static async deleteGoalById(request: APIRequestContext, goalId: string) {
    await request.delete(Endpoint.goal(goalId));
  }

  public static async createNewDocInSpace(request: APIRequestContext, docName: string, spaceId: string) {
    const teamId: string = process.env.BASE_TEAM_ID as string;
    const apiKey: string = process.env.API_KEY as string;

    const newDocBody = GenerateData.generateDoc(docName, { id: spaceId, type: 4 });

    await request.post(Endpoint.teamDocs(), { headers: { Authorization: apiKey }, data: newDocBody });
  }

  public static async deleteDocsByName(request: APIRequestContext, docName: string) {
    const token: string = (await request.storageState()).origins[0].localStorage.filter((element) => element.name === "id_token")[0].value;

    const body = {
      viewIds: await ApiUtils.getDocIdsByName(request, docName),
    };

    await request.delete(Endpoint.deleteDocs(), { headers: { Authorization: `Bearer ${token}` }, data: body });
  }

  public static async deleteListById(request: APIRequestContext, listId: string) {
    await request.delete(Endpoint.list(listId));
  }

  public static async createFolderlessList(request: APIRequestContext, spaceName?: string, listName?: string): Promise<APIResponse> {
    const apiKey: string = process.env.API_KEY as string;
    const spaceId = await ApiUtils.getSpaceIdByName(request, spaceName ?? "Team Space");

    const response = await request.post(Endpoint.folderlessList(spaceId), {
      headers: { Authorization: apiKey },
      data: { name: listName ?? faker.database.engine() },
    });

    return response;
  }

  public static async addCommentToTask(request: APIRequestContext, taskId: string, commentText?: string): Promise<APIResponse> {
    const commentBody = GenerateData.getComment(commentText);

    const response = await request.post(Endpoint.taskComment(taskId), { data: commentBody });
    return response;
  }

  public static async addCommentToList(request: APIRequestContext, listId: string, commentText?: string): Promise<APIResponse> {
    const commentBody = GenerateData.getComment(commentText);

    const response = await request.post(Endpoint.listComment(listId), { data: commentBody });
    return response;
  }

  public static async addCommentToView(request: APIRequestContext, viewId: string, commentText?: string): Promise<APIResponse> {
    const commentBody = GenerateData.getComment(commentText);

    const response = await request.post(Endpoint.addViewComment(viewId), { data: commentBody });
    return response;
  }

  public static async addDefaultChatView(request: APIRequestContext): Promise<APIResponse> {
    const defaultTaskBody = GenerateData.getDefaultChatView();
    const response = await request.post(Endpoint.teamView(), { data: defaultTaskBody });

    return response;
  }

  public static async deleteViewById(request: APIRequestContext, viewId: string) {
    await request.delete(Endpoint.view(viewId));
  }

  public static async deleteFolderByName(request: APIRequestContext, spaceName: string, folderName: string) {
    const apiKey: string = process.env.API_KEY as string;
    const folderId = await ApiUtils.getFolderIdByName(request, spaceName, folderName);

    await request.delete(Endpoint.folder(folderId), { headers: { Authorization: apiKey } });
  }

  public static async createFolderByName(request: APIRequestContext, spaceName: string, folderName: string) {
    const apiKey: string = process.env.API_KEY as string;
    const spaceId = await ApiUtils.getSpaceIdByName(request, spaceName);

    const newFolderBody = {
      name: folderName,
    };

    await request.post(Endpoint.spaceFolder(spaceId), { headers: { Authorization: apiKey }, data: newFolderBody });
  }
}
