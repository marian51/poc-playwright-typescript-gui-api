import test, { expect } from "@playwright/test";
import { ApiHooks } from "../../api-utils/apiHooks";
import { faker } from "@faker-js/faker";
import { GenerateData } from "../../api-utils/generateBody";
import { SELF_ID } from "../../resources/constants";
import { ApiService } from "../../api-utils/apiService";
import { Endpoint } from "../../api-utils/endpoints";

test.describe(
  "Comment feature",
  {
    tag: ["@Comment"],
  },
  () => {
    let listId: string;

    test.beforeAll("Setup - Prepare a list", async ({ request }) => {
      const folderResponse = await ApiHooks.createFolderlessList(request);
      listId = (await folderResponse.json()).id;
    });

    test.afterAll("Teardown - delete the list with a task", async ({ request }) => {
      await ApiHooks.deleteListById(request, listId);
    });

    test.describe("Task comments", () => {
      let taskId: string;
      const taskName = faker.internet.emoji();

      test.beforeAll("Setup - Prepare a task", async ({ request }) => {
        const taskResponse = await ApiHooks.createNewTask(request, taskName, listId);
        taskId = (await taskResponse.json()).id;
      });

      test("Add task comment", async ({ request }) => {
        const comment = GenerateData.getComment();

        const response = await ApiService.postWithData(Endpoint.taskComment(taskId), comment, request);
        const responseJson = await response.json();

        await expect(response).toBeOK();
        expect(responseJson.id).toBeTruthy();
        expect(responseJson.version.data.relationships[1]).toHaveProperty("object_id", taskId);
      });

      test("Delete task comment", async ({ request }) => {
        const commentResponse = await ApiHooks.addCommentToTask(request, taskId);
        const commentId = (await commentResponse.json()).id;

        const response = await ApiService.delete(Endpoint.comment(commentId), request);
        const responseJson = await response.json();

        await expect(response).toBeOK();
        expect(responseJson).toMatchObject({});
      });

      test.describe("Updating", () => {
        let commentId: string;

        test.beforeEach("Prepare a comment", async ({ request }) => {
          const commentResponse = await ApiHooks.addCommentToTask(request, taskId);
          commentId = (await commentResponse.json()).id;
        });

        test("Edit a comment", async ({ request }) => {
          const editedComment = GenerateData.getRandomCommentUpdate();
          const response = await ApiService.putWithData(Endpoint.comment(commentId), editedComment, request);
          const responseJson = await response.json();

          await expect(response).toBeOK();
          expect(responseJson).toMatchObject({});
        });

        test("Assign yourself to a comment", async ({ request }) => {
          const response = await ApiService.putWithData(Endpoint.comment(commentId), { assignee: SELF_ID }, request);
          const responseJson = await response.json();

          await expect(response).toBeOK();
          expect(responseJson).toMatchObject({});
        });
      });
    });

    test.describe("List comments", () => {
      test("Add comment", async ({ request }) => {
        const commentBody = GenerateData.getComment();
        const response = await ApiService.postWithData(Endpoint.listComment(listId), commentBody, request);
        const responseJson = await response.json();

        await expect(response).toBeOK();
        expect(responseJson.id).toBeTruthy();
        expect(responseJson.version.data.relationships[1]).toHaveProperty("object_id", listId);
      });

      test("Delete comment", async ({ request }) => {
        const commentResponse = await ApiHooks.addCommentToList(request, listId);
        const commentId = (await commentResponse.json()).id;

        const response = await ApiService.delete(Endpoint.comment(commentId), request);
        const responseJson = await response.json();

        await expect(response).toBeOK();
        expect(responseJson).toMatchObject({});
      });
    });
  }
);

test.describe(
  "Comment feature › Chat",
  {
    tag: ["@Comment", "@Chat"],
  },
  () => {
    let chatViewId: string;
    let commentId: string;

    test.beforeAll("Setup - Create chat view", async ({ request }) => {
      const response = await ApiHooks.addDefaultChatView(request);
      chatViewId = (await response.json()).view.id;
    });

    test.afterAll("Teardown - Delete chat view", async ({ request }) => {
      await ApiHooks.deleteViewById(request, chatViewId);
    });

    test.beforeEach("Prepare a chat message", async ({ request }) => {
      const commentResponse = await ApiHooks.addCommentToView(request, chatViewId);
      commentId = (await commentResponse.json()).id;
    });

    test("Add comment (chat message)", async ({ request }) => {
      const message = faker.music.songName();
      const response = await ApiService.postWithData(Endpoint.addViewComment(chatViewId), { comment_text: message }, request);
      const responseJson = await response.json();

      await expect(response).toBeOK();
      expect(responseJson.id).toBeTruthy();
      expect(responseJson.version.data.relationships[1]).toHaveProperty("object_id", chatViewId);
    });

    test("Delete a comment (chat message)", async ({ request }) => {
      const response = await ApiService.delete(Endpoint.comment(commentId), request);
      const responseJson = await response.json();

      await expect(response).toBeOK();
      expect(responseJson).toMatchObject({});
    });

    test("Reply to a comment", async ({ request }) => {
      const message = faker.music.songName();
      const response = await ApiService.postWithData(Endpoint.commentReply(commentId), { comment_text: message }, request)
      const responseJson = await response.json();

      await expect(response).toBeOK();
      expect(responseJson).toMatchObject({});
    });
  }
);
