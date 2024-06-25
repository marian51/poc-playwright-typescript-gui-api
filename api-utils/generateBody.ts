import { faker } from "@faker-js/faker";

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

  public static generateDoc(docName: string, parent: {id: string, type: number}) {
    return {
      name: docName,
      parent: parent
    };
  }
}
