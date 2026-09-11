import { Task } from "@task-manager/domain";

export interface ITaskRepository {
  getTasks(): Promise<Task[]>;

  getTaskById(id: number): Promise<Task | null>;

  createTask(title: string): Promise<Task>;

  updateTask(
    id: number,
    title: string,
    completed: boolean,
  ): Promise<Task | null>;

  deleteTask(id: number): Promise<boolean>;
}
