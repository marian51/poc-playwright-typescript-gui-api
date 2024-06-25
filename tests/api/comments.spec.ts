import test, { expect } from "@playwright/test";
import { ApiHooks } from "../../api-utils/apiHooks";
import { faker } from "@faker-js/faker";
import { GenerateData } from "../../api-utils/generateBody";

test.describe("Comment feature tests", () => {
  let listId: string;
  let taskId: string;
  test.describe("Task comments", () => {
    const taskName = faker.internet.emoji();

    test.beforeAll("Create a list and a task", async ({ request }) => {
      const folderResponse = await ApiHooks.createFolderlessList(request);
      listId = (await folderResponse.json()).id;

      const taskResponse = await ApiHooks.createNewTask(request, taskName, listId);
      taskId = (await taskResponse.json()).id;
    });

    test.afterAll("Teardown - delete the list with a task", async ({ request }) => {
      await ApiHooks.deleteListById(request, listId);
    });

    test("Add task comment", async ({ request }) => {
      const comment = faker.lorem.paragraph();

      const response = await request.post(`https://api.clickup.com/api/v2/task/${taskId}/comment`, {
        data: {
          comment_text: comment,
          notify_all: false,
        },
      });
      const responseJson = await response.json();

      await expect(response).toBeOK();
      expect(responseJson.id).toBeTruthy();
      expect(responseJson.version.data.relationships[1]).toHaveProperty("object_id", taskId);
    });

    test("Delete task comment", async ({ request }) => {
      const comment = faker.lorem.paragraph();
      const commentResponse = await ApiHooks.addCommentToTask(request, taskId, comment);
      const commentId = (await commentResponse.json()).id;

      const response = await request.delete(`/api/v2/comment/${commentId}`);
      const responseJson = await response.json();

      // Expect 200 with empty body
      await expect(response).toBeOK();
      expect(responseJson).toMatchObject({});
    });

    test.describe("Updating", async () => {
      let commentId: string;

      test.beforeEach("Prepare a comment", async ({ request }) => {
        const comment = faker.lorem.paragraph();
        const commentResponse = await ApiHooks.addCommentToTask(request, taskId, comment);
        commentId = (await commentResponse.json()).id;
        // TODO: continue here, maybe change comment to use GenerateData, CLEANUP
      });

      test("Edit a comment", async ({ request }) => {
        const editedComment = await GenerateData.getRandomCommentUpdate();
        const response = await request.put(`/api/v2/comment/${commentId}`, { data: editedComment });
        const responseJson = await response.json();

        await expect(response).toBeOK();
        expect(responseJson).toMatchObject({});
      });
    });
  });
});
