import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { ApiUtils } from "./apiUtils";
import { GenerateData } from "./generateBody";
import { faker } from "@faker-js/faker";

export class ApiHooks {
  public static async deleteSpaceByName(request: APIRequestContext, spaceName: string) {
    const teamId: string = process.env.BASE_TEAM_ID as string;
    const getSpacesEndpoint: string = `https://api.clickup.com/api/v2/team/${teamId}/space`;

    // Getting all existing spaces
    const allSpacesResponse = await request.get(getSpacesEndpoint);

    // Finding space id
    const spaceId = (await allSpacesResponse.json()).spaces.filter((space) => space.name === spaceName)[0].id;

    // Deleting space by id
    const deleteSpaceEndpoint: string = `https://api.clickup.com/api/v2/space/${spaceId}`;
    await request.delete(deleteSpaceEndpoint);
  }

  public static async createSpaceByName(request: APIRequestContext, spaceName: string) {
    const teamId: string = process.env.BASE_TEAM_ID as string;
    const postSpaceEndpoint: string = `https://api.clickup.com/api/v2/team/${teamId}/space`;

    // Creating new space
    const newSpaceBody = {
      name: spaceName,
    };

    // Posting new space
    const response = await request.post(postSpaceEndpoint, { data: newSpaceBody });
  }

  // Currently, new tasks are always being created in [Team Space/Projects/Project 1] by default
  // TODO: Discuss and decide how to handle task creation
  public static async createNewTask(request: APIRequestContext, taskName: string, taskListId?: string) {
    const listId: string = taskListId ?? (await ApiUtils.getBaseListId(request));
    const createTaskEndpoint: string = `https://api.clickup.com/api/v2/list/${listId}/task`;

    const newTaskBody = {
      name: taskName,
    };

    const response = await request.post(createTaskEndpoint, { data: newTaskBody });
    return response;
  }

  public static async deleteTask(request: APIRequestContext, taskName: string) {
    const taskId = await ApiUtils.getTaskIdFromBaseList(request, taskName);
    const deleteTaskEndpoint: string = `https://api.clickup.com/api/v2/task/${taskId}`;

    await request.delete(deleteTaskEndpoint, { headers: { "Content-Type": "application/json" } });
  }

  public static async createRandomGoal(request: APIRequestContext): Promise<APIResponse> {
    const preparedGoalBody = GenerateData.getRandomGoal();
    const response = await request.post(`/api/v2/team/${process.env.BASE_TEAM_ID}/goal`, { data: preparedGoalBody });

    return response;
  }

  public static async deleteGoalById(request: APIRequestContext, goalId: string) {
    await request.delete(`/api/v2/goal/${goalId}`);
  }

  public static async createFolderlessList(request: APIRequestContext, listName?: string): Promise<APIResponse> {
    const spaceId = await ApiUtils.getSpaceIdByName(request, "Team Space");
    const createFolderlessListEndpoint = `https://api.clickup.com/api/v2/space/${spaceId}/list`;
    const response = await request.post(createFolderlessListEndpoint, { data: { name: listName || faker.database.engine() } });

    return response;
  }

}
