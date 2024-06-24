import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { ApiUtils } from "./apiUtils";
import { GenerateBody } from "./generateBody";
import { faker } from "@faker-js/faker";

export class ApiHooks {
  public static async deleteSpaceByName(request: APIRequestContext, spaceName: string) {
    const teamId: string = process.env.BASE_TEAM_ID as string;
    const apiKey: string = process.env.API_KEY as string;
    const getSpacesEndpoint: string = `https://api.clickup.com/api/v2/team/${teamId}/space`;

    // Getting all existing spaces
    const allSpacesResponse = await request.get(getSpacesEndpoint, {
      headers: { Authorization: apiKey },
    });

    // Finding space id
    const spaceId = (await allSpacesResponse.json()).spaces.filter((space) => space.name === spaceName)[0].id;

    // Deleting space by id
    const deleteSpaceEndpoint: string = `https://api.clickup.com/api/v2/space/${spaceId}`;
    await request.delete(deleteSpaceEndpoint, {
      headers: { Authorization: apiKey },
    });
  }

  public static async createSpaceByName(request: APIRequestContext, spaceName: string) {
    const teamId: string = process.env.BASE_TEAM_ID as string;
    const apiKey: string = process.env.API_KEY as string;
    const postSpaceEndpoint: string = `https://api.clickup.com/api/v2/team/${teamId}/space`;

    // Creating new space
    const newSpaceBody = {
      name: spaceName,
    };

    // Posting new space
    const response = await request.post(postSpaceEndpoint, { headers: { Authorization: apiKey }, data: newSpaceBody });
  }

  // Currently, new tasks are always being created in [Team Space/Projects/Project 1] by default
  // TODO: Discuss and decide how to handle task creation
  public static async createNewTask(request: APIRequestContext, taskName: string, taskListId?: string) {
    // const taskListId: string = await ApiUtils.getBaseListId(request);
    const listId: string = taskListId ?? await ApiUtils.getBaseListId(request);
    const apiKey: string = process.env.API_KEY as string;
    const createTaskEndpoint: string = `https://api.clickup.com/api/v2/list/${listId}/task`;

    const newTaskBody = {
      name: taskName,
    };

    const response = await request.post(createTaskEndpoint, { headers: { Authorization: apiKey }, data: newTaskBody });
    return response;
  }

  public static async deleteTask(request: APIRequestContext, taskName: string) {
    const apiKey: string = process.env.API_KEY as string;
    const taskId = await ApiUtils.getTaskIdFromBaseList(request, taskName);
    const deleteTaskEndpoint: string = `https://api.clickup.com/api/v2/task/${taskId}`;

    await request.delete(deleteTaskEndpoint, { headers: { Authorization: apiKey, "Content-Type": "application/json" } });
  }

  public static async createRandomGoal(request: APIRequestContext): Promise<APIResponse> {
    const preparedGoalBody = GenerateBody.getRandomGoal();
    const response = await request.post(`/api/v2/team/${process.env.BASE_TEAM_ID}/goal`, { data: preparedGoalBody });

    expect.soft(response).toBeOK();
    return response;
  }

  public static async deleteGoalById(request: APIRequestContext, goalId: string) {
    const response = await request.delete(`/api/v2/goal/${goalId}`);

    expect.soft(response.status()).toEqual(200);
  }

  public static async createFolderlessList(request: APIRequestContext, listName?: string): Promise<APIResponse> {
    const spaceId = await ApiUtils.getSpaceIdByName(request, "Team Space");
    const createFolderlessListEndpoint = `https://api.clickup.com/api/v2/space/${spaceId}/list`;
    const response = await request.post(createFolderlessListEndpoint, { data: { name: listName || faker.database.engine() }});

    return response;
  }
}
