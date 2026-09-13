import { vi } from "vitest";
import { ITaskRepository } from "../../src/ports/ITaskRepository";
import { Task } from "@task-manager/domain";

export class MockTaskRepository implements ITaskRepository {
  getTasks = vi.fn<() => Promise<Task[]>>();

  getTaskById = vi.fn<(id: number) => Promise<Task | null>>();

  createTask = vi.fn<(title: string) => Promise<Task>>();

  updateTask =
    vi.fn<
      (id: number, title: string, completed: boolean) => Promise<Task | null>
    >();

  deleteTask = vi.fn<(id: number) => Promise<boolean>>();
}
