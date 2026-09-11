import { Task as PrismaTask } from "../generated/prisma/client";
import { Task } from "@task-manager/domain";

export class TaskMapper {
  static toDomain(task: PrismaTask): Task {
    return {
      id: task.id,
      title: task.title,
      completed: task.completed,
    };
  }

  static toDomainList(tasks: PrismaTask[]): Task[] {
    return tasks.map((task) => this.toDomain(task));
  }
}
