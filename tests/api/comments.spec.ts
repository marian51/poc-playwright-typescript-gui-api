import test from "@playwright/test";
import { ApiHooks } from "../../api-utils/apiHooks";

test.describe("Comment feature tests", () => {
  test.describe("Task comments", () => {
    test.beforeAll(async ({ request }) => {
      await ApiHooks.createFolderlessList(request);
    });

    test("Add task comment", async ({ request }) => {
      console.log("hello");
    });
  });
});