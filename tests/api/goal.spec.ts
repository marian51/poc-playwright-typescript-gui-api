import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe(
  "Goal feature tests",
  {
    tag: ["@API", "@Goal"],
  },
  () => {
    test("API test example", async ({ request }) => {
      const response = await request.get(`/api/v2/team/${process.env.BASE_TEAM_ID}/goal`);
      expect(response).toBeOK();
    });

    test("Create new goal", async ({ request }) => {
      const newGoalBody = {
        name: faker.person.jobType(),
        due_date: 1568036964079,
        description: faker.hacker.phrase(),
        multiple_owners: false,
        owners: [process.env.USER_ID],
        color: faker.color.rgb(),
      };
      const response = await request.post(`/api/v2/team/${process.env.BASE_TEAM_ID}/goal`, { data: newGoalBody });
      expect(response).toBeOK();
    });

    test("Update existing goal", async ({ request }) => {
      const goalId = process.env.PERMANENT_GOAL_ID;
      const updatedGoalBody = {
        name: faker.animal.bear(),
        color: "#000000",
      };
      const response = await request.put(`/api/v2/goal/${goalId}`, { data: updatedGoalBody });
      expect(response).toBeOK();
    });

    test.skip("Delete a goal", async ({ request }) => {
      const goalId = "GOAL_ID"; // TODO: handle IDs
      const response = await request.delete(`/api/v2/goal/${goalId}`);
      expect(response.status()).toEqual(200);
    });
  }
);
