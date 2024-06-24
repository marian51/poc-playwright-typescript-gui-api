import test from "@playwright/test";
import { ApiHooks } from "../../api-utils/apiHooks";
import { faker } from "@faker-js/faker";

test.describe("Comment feature tests", () => {
  test.describe("Task comments", () => {
    let listId: string;
    let taskId: string;
    const taskName = faker.internet.emoji();

    test.beforeAll(async ({ request }) => {
      const folderResponse = await ApiHooks.createFolderlessList(request);
      listId = (await folderResponse.json()).id;

      const taskResponse = await ApiHooks.createNewTask(request, taskName, listId);
      taskId = (await taskResponse.json()).id;
    });

    test.afterAll(async ({ request }) => {
      // TODO: cleanup
    });

    test("Add task comment", async ({ request }) => {
      const comment = faker.lorem.paragraph();

      await request.post(`https://api.clickup.com/api/v2/task/${taskId}/comment`, {
        data: {
          comment_text: comment,
          notify_all: false,
        },
      });

      //TODO: assert
    });
  });
});
