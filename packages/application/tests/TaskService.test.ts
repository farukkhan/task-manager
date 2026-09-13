import "reflect-metadata";
import { describe, it, expect } from "vitest";
import { TaskService } from "../src/services/TaskService";
import { ITaskRepository } from "../src/ports/ITaskRepository";
import { Task } from "@task-manager/domain";

describe("TaskService", () => {
  it("should return all tasks", async () => {
    const tasks: Task[] = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ];

    const fakeTaskRepository: ITaskRepository = {
      getTasks: async () => tasks,
      getTaskById: async (id: number) => tasks[0],
      createTask: async (title: string) => tasks[0],
      updateTask: async (id: number, title: string, completed: boolean) =>
        tasks[0],
      deleteTask: async (id: number) => true,
    };

    const taskService = new TaskService(fakeTaskRepository);
    const result = await taskService.getTasks();

    expect(result).toEqual(tasks);
  });
});
