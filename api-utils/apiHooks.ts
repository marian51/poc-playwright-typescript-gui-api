import { APIRequestContext } from "@playwright/test";

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

  public static async createNewTask(request: APIRequestContext, taskName: string) {
    const taskListId: string = process.env.TASK_LIST_ID as string;
    const createTaskEndpoint: string = `https://api.clickup.com/api/v2/list/${taskListId}/task`;

    const newTaskBody = {
      name: taskName,
    };

    await request.post(createTaskEndpoint);
  }
}
