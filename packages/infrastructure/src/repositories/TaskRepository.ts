import { ITaskRepository } from "@task-manager/application";
import { Task } from "@task-manager/domain";
import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TaskMapper } from "../mappers/TaskMapper";

@injectable()
export class TaskRepository implements ITaskRepository {
  async getTasks(): Promise<Task[]> {
    const tasks = await prisma.task.findMany();
    return TaskMapper.toDomainList(tasks);
  }

  async getTaskById(id: number): Promise<Task | null> {
    const task = await prisma.task.findUnique({ where: { id } });
    return task ? TaskMapper.toDomain(task) : null;
  }

  async createTask(title: string): Promise<Task> {
    const task = await prisma.task.create({ data: { title } });
    return TaskMapper.toDomain(task);
  }

  async updateTask(
    id: number,
    title: string,
    completed: boolean,
  ): Promise<Task | null> {
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      return null;
    }

    const taskUpdate = {
      title: title,
      completed: completed,
    };

    const updatedTask = await prisma.task.update({
      where: { id },
      data: taskUpdate,
    });
    return TaskMapper.toDomain(updatedTask);
  }

  async deleteTask(id: number): Promise<boolean> {
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      return false;
    }

    await prisma.task.delete({ where: { id } });

    return true;
  }
}
