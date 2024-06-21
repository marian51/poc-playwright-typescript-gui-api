import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe(
  "Goal feature",
  {
    tag: ["@Goal"],
  },
  () => {
    test.describe("Tests involving creating new Goals", () => {
      let createdTaskId: string;

      test("Create new goal", async ({ request }) => {
        const goalName = faker.person.jobType();
        const goalDescription = faker.hacker.phrase();
        const goalColor = faker.color.rgb();

        const newGoalBody = {
          name: goalName,
          due_date: 1568036964079,
          description: goalDescription,
          multiple_owners: false,
          owners: [],
          color: goalColor,
        };

        const response = await request.post(`/api/v2/team/${process.env.BASE_TEAM_ID}/goal`, { data: newGoalBody });
        createdTaskId = (await response.json()).goal.id;
        expect(response).toBeOK();
      });

      test.afterEach(async ({ request }) => {
        await request.delete(`https://api.clickup.com/api/v2/goal/${createdTaskId}`);
      });
    });

    test.describe("Tests involving deleting Goals", () => {
      test.skip("Delete a goal", async ({ request }) => {
        const goalId = "GOAL_ID"; // TODO: handle IDs
        const response = await request.delete(`/api/v2/goal/${goalId}`);
        expect(response.status()).toEqual(200);
      });
    });

    test.describe("Tests performed on existing Goals", () => {
      test("Get all non-archived goals", async ({ request }) => {
        const response = await request.get(`/api/v2/team/${process.env.BASE_TEAM_ID}/goal`);
        expect(response).toBeOK();
      });

      test("Update existing goal", async ({ request }) => {
        const goalId = process.env.PERMANENT_GOAL_ID;
        const updatedTaskName = faker.animal.bear();

        const updatedGoalBody = {
          name: updatedTaskName,
          color: "#000000",
        };

        const response = await request.put(`/api/v2/goal/${goalId}`, { data: updatedGoalBody });
        expect(response).toBeOK();
      });
    });
  }
);
