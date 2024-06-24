import { faker } from "@faker-js/faker";

export class GenerateBody {
  public static getRandomGoal() {
    const goalName = faker.person.jobType();
    const goalDescription = faker.hacker.phrase();
    const goalColor = faker.color.rgb();

    const randomGoalBody = {
      name: goalName,
      due_date: 1568036964079,
      description: goalDescription,
      multiple_owners: false,
      owners: [],
      color: goalColor,
    };

    return randomGoalBody;
  }
}
