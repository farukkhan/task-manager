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
}
