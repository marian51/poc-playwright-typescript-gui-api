import { faker } from "@faker-js/faker";
import chatViewBody from "../resources/chat-view.json";

export class GenerateData {
  public static getRandomGoal() {
    const goalName = faker.person.jobType();
    const goalDescription = faker.hacker.phrase();
    const goalColor = faker.color.rgb();
    const dueDate = new Date(faker.date.future()).valueOf();

    const randomGoalBody = {
      name: goalName,
      due_date: dueDate,
      description: goalDescription,
      multiple_owners: false,
      owners: [],
      color: goalColor,
    };

    return randomGoalBody;
  }

  public static generateDoc(docName: string, parent: { id: string; type: number }) {
    return {
      name: docName,
      parent: parent,
    };
  }

  public static getComment(text?: string) {
    const commentText = text ?? faker.lorem.paragraph();
    const notifyAll = false;

    const randomCommentBody = {
      comment_text: commentText,
      notify_all: notifyAll,
    };

    return randomCommentBody;
  }

  // Comment update requires different body than new comment
  public static getRandomCommentUpdate() {
    const commentText = faker.lorem.slug();
    const resolved = false;

    const randomCommentEditBody = {
      comment_text: commentText,
      resolved: resolved,
    };

    return randomCommentEditBody;
  }

  public static getDefaultChatView() {
    return chatViewBody;
  }
}
