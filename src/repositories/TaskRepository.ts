import {ITaskRepository} from "./ITaskRepository";
import { Task } from "../models/Task";
import {injectable} from "tsyringe";
import { prisma } from "../database/prisma";

@injectable()
export class TaskRepository implements ITaskRepository {

  async getTasks(): Promise<Task[]> {
    return prisma.task.findMany();
  }

  async getTaskById(id: number): Promise<Task | null> {
    return prisma.task.findUnique({ where: { id } });
  }

  async createTask(title: string): Promise<Task> {
    return prisma.task.create({ data: {title} });
  }

  async updateTask(id: number, title: string, completed: boolean): Promise<Task | null> {
    const task= await prisma.task.findUnique({ where: { id } });

    if (!task) {
      return null;
    }

    const taskUpdate = {
      title: title,
      completed: completed,
    };

    return prisma.task.update({ where: { id }, data: taskUpdate });
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
