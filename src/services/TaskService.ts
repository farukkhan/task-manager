import { Task } from "../models/Task";
import { ITaskRepository } from "../repositories/ITaskRepository";
import { injectable, inject } from "tsyringe";

@injectable()
export class TaskService {
  constructor(
    @inject("ITaskRepository") private taskRepository: ITaskRepository,
  ) {}

  async getTasks() {
    return this.taskRepository.getTasks();
  }

  async getTaskById(id: number) {
    return this.taskRepository.getTaskById(id);
  }

  async createTask(title: string): Promise<Task> {
    return this.taskRepository.createTask(title);
  }

  async updateTask(
    id: number,
    title: string,
    completed: boolean,
  ): Promise<Task | null> {
    return this.taskRepository.updateTask(id, title, completed);
  }

  async deleteTask(id: number): Promise<boolean> {
    return this.taskRepository.deleteTask(id);
  }
}
