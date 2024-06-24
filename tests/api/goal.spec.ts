import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { GenerateBody } from "../../api-utils/generateBody";
import { ApiHooks } from "../../api-utils/apiHooks";

test.describe(
  "Goal feature",
  {
    tag: ["@Goal"],
  },
  () => {
    test.describe("Tests involving creating new Goals", () => {
      let createdGoalId: string;

      test("Create new goal", async ({ request }) => {
        const newGoalBody = GenerateBody.getRandomGoal();

        const response = await request.post(`/api/v2/team/${process.env.BASE_TEAM_ID}/goal`, { data: newGoalBody });
        const responseJson = await response.json();
        createdGoalId = responseJson.goal.id;

        expect(response).toBeOK();
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
        const response = await request.delete(`/api/v2/goal/${preparedGoalId}`);
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
        const response = await request.get(`/api/v2/team/${process.env.BASE_TEAM_ID}/goal`);
        const responseJson = await response.json();

        expect(response).toBeOK();
        expect(responseJson.goals).toBeTruthy();
      });

      test("Update existing goal", async ({ request }) => {
        const updatedGoalName = faker.animal.bear();

        const updatedGoalBody = {
          name: updatedGoalName,
          color: "#000000",
        };

        const response = await request.put(`/api/v2/goal/${preparedGoalId}`, { data: updatedGoalBody });
        const responseJson = await response.json();

        expect(response).toBeOK();
        expect(responseJson.goal.name).toBe(updatedGoalName);
      });
    });
  }
);
