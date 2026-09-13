import "reflect-metadata";
import { describe, it, expect, vi } from "vitest";
import { TaskService } from "../src/services/TaskService";
import { Task } from "@task-manager/domain";
import { MockTaskRepository } from "./mocks/MockTaskRepository";

describe("TaskService", () => {
  it("should return all tasks", async () => {
    const tasks: Task[] = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ];

    const mockTaskRepository = new MockTaskRepository();
    mockTaskRepository.getTasks.mockResolvedValue(tasks);

    const taskService = new TaskService(mockTaskRepository);
    const result = await taskService.getTasks();

    expect(result).toEqual(tasks);
    expect(mockTaskRepository.getTasks).toHaveBeenCalledTimes(1);
  });
});
