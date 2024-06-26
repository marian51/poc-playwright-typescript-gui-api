import test, { expect } from "@playwright/test";
import { ApiHooks } from "../../api-utils/apiHooks";
import { faker } from "@faker-js/faker";
import { GenerateData } from "../../api-utils/generateBody";

test.describe("Comment feature",
  {
    tag: ["@Comment"],
  },
  () => {
  let listId: string;

  test.beforeAll("Prepare a list", async ({ request }) => {
    const folderResponse = await ApiHooks.createFolderlessList(request);
    listId = (await folderResponse.json()).id;
  });

  test.afterAll("Teardown - delete the list with a task", async ({ request }) => {
    await ApiHooks.deleteListById(request, listId);
  });

  test.describe("Task comments", () => {
    let taskId: string;
    const taskName = faker.internet.emoji();

    test.beforeAll("Prepare a task", async ({ request }) => {
      const taskResponse = await ApiHooks.createNewTask(request, taskName, listId);
      taskId = (await taskResponse.json()).id;
    });

    test("Add task comment", async ({ request }) => {
      const comment = faker.lorem.paragraph();

      const response = await request.post(`/api/v2/task/${taskId}/comment`, {
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

      await expect(response).toBeOK();
      expect(responseJson).toMatchObject({});
    });

    test.describe("Updating", () => {
      let commentId: string;

      test.beforeEach("Prepare a comment", async ({ request }) => {
        const comment = faker.lorem.paragraph();
        const commentResponse = await ApiHooks.addCommentToTask(request, taskId, comment);
        commentId = (await commentResponse.json()).id;
      });

      test("Edit a comment", async ({ request }) => {
        const editedComment = await GenerateData.getRandomCommentUpdate();
        const response = await request.put(`/api/v2/comment/${commentId}`, { data: editedComment });
        const responseJson = await response.json();

        await expect(response).toBeOK();
        expect(responseJson).toMatchObject({});
      });

      test("Assign yourself to a comment", async ({ request }) => {
        const response = await request.put(`/api/v2/comment/${commentId}`, { data: { assignee: 183 } });
        const responseJson = await response.json();

        await expect(response).toBeOK();
        expect(responseJson).toMatchObject({});
      });
    });
  });

  test.describe("List comments", () => {
    test("Add comment", async ({ request }) => {
      const commentBody = GenerateData.getComment();
      const response = await request.post(`/api/v2/list/${listId}/comment`, { data: commentBody });
      const responseJson = await response.json();

      await expect(response).toBeOK();
      expect(responseJson.id).toBeTruthy();
      expect(responseJson.version.data.relationships[1]).toHaveProperty("object_id", listId);
    });

    test("Delete comment", async ({ request }) => {
      const commentResponse = await ApiHooks.addCommentToList(request, listId);
      const commentId = (await commentResponse.json()).id;

      const response = await request.delete(`/api/v2/comment/${commentId}`);
      const responseJson = await response.json();

      await expect(response).toBeOK();
      expect(responseJson).toMatchObject({});
    });
  });
});
