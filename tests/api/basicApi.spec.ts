import { expect, test } from "@playwright/test";

test.only("API test example", async ({ request }) => {
  const response = await request.get(`/api/v2/team/${process.env.BASE_TEAM_ID}/goal`);
  expect(response).toBeOK();
});
