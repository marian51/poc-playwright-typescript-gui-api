import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { GenerateData } from "../../api-utils/generateBody";
import { ApiHooks } from "../../api-utils/apiHooks";
import { ApiService } from "../../api-utils/apiService";
import { Endpoint } from "../../api-utils/endpoints";

test.describe.skip(
  "Goal feature",
  {
    tag: ["@Goal"],
  },
  () => {
    test.describe("Tests involving creating new Goals", () => {
      let createdGoalId: string;

      test("Create new goal", async ({ request }) => {
        const newGoalBody = GenerateData.getRandomGoal();

        // const response = await request.post(`/api/v2/team/${process.env.BASE_TEAM_ID}/goal`, { data: newGoalBody });
        const response = await ApiService.postWithData(Endpoint.goal(), newGoalBody, request);
        const responseJson = await response.json();
        createdGoalId = responseJson.goal.id;

        await expect(response).toBeOK();
        expect(responseJson).toEqual(
          expect.objectContaining({
            goal: expect.anything(),
          })
        );
        expect(responseJson.goal.id).toBeTruthy();
        expect(responseJson.goal.name).toBe(newGoalBody.name);
      });

      test.afterEach(async ({ request }) => {
        await ApiHooks.deleteGoalById(request, createdGoalId);
      });
    });

    test.describe("Tests involving deleting Goals", () => {
      let preparedGoalId: string;

      test.beforeEach(async ({ request }) => {
        const response = await ApiHooks.createRandomGoal(request);
        preparedGoalId = (await response.json()).goal.id;
      });

      test("Delete a goal", async ({ request }) => {
        // const response = await request.delete(`/api/v2/goal/${preparedGoalId}`);
        const response = await ApiService.delete(Endpoint.goal(preparedGoalId), request);
        expect(response.status()).toEqual(200);
      });
    });

    test.describe("Tests performed on existing Goal", () => {
      let preparedGoalId: string;

      test.beforeAll(async ({ request }) => {
        const response = await ApiHooks.createRandomGoal(request);
        preparedGoalId = (await response.json()).goal.id;
      });

      test.afterAll(async ({ request }) => {
        await ApiHooks.deleteGoalById(request, preparedGoalId);
      });

      test("Get all non-archived goals", async ({ request }) => {
        // const response = await request.get(`/api/v2/team/${process.env.BASE_TEAM_ID}/goal`);
        const response = await ApiService.get(Endpoint.teamGoals(), request);
        const responseJson = await response.json();

        await expect(response).toBeOK();
        expect(responseJson.goals).toBeTruthy();
      });

      test("Update name of an existing goal", async ({ request }) => {
        const updatedGoalName = faker.animal.bear();

        const updatedGoalBody = {
          name: updatedGoalName,
        };

        // const response = await request.put(`/api/v2/goal/${preparedGoalId}`, { data: updatedGoalBody });
        const response = await ApiService.putWithData(Endpoint.goal(preparedGoalId), updatedGoalBody, request);
        const responseJson = await response.json();

        await expect(response).toBeOK();
        expect(responseJson.goal.name).toBe(updatedGoalName);
      });
    });
  }
);
