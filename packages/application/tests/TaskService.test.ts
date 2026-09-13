import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import { TaskService } from "../src/services/TaskService";
import { Task } from "@task-manager/domain";
import { MockTaskRepository } from "./mocks/MockTaskRepository";

describe("TaskService", () => {
  let mockTaskRepository: MockTaskRepository;
  let taskService: TaskService;

  beforeEach(() => {
    mockTaskRepository = new MockTaskRepository();
    taskService = new TaskService(mockTaskRepository);
  });

  it("should return all tasks", async () => {
    const tasks: Task[] = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ];

    mockTaskRepository.getTasks.mockResolvedValue(tasks);

    const result = await taskService.getTasks();

    expect(result).toEqual(tasks);
    expect(mockTaskRepository.getTasks).toHaveBeenCalledOnce();
  });

  it("GetAllTask should ruturn empty array when repository returns empty task array", async () => {
    const tasks: Task[] = [];

    mockTaskRepository.getTasks.mockResolvedValue(tasks);

    const result = await taskService.getTasks();

    expect(result).toEqual([]);
    expect(mockTaskRepository.getTasks).toHaveBeenCalledOnce();
  });

  it("should return the task with the supplied task id", async () => {
    const task: Task = { id: 1, title: "Task 1", completed: true };

    mockTaskRepository.getTaskById.mockResolvedValue(task);

    const result = await taskService.getTaskById(1);

    expect(result).toEqual(task);
    expect(mockTaskRepository.getTaskById).toHaveBeenCalledOnce();
    expect(mockTaskRepository.getTaskById).toHaveBeenCalledWith(1);
  });

  it("GetTaskById should return null when repository returns null", async () => {
    mockTaskRepository.getTaskById.mockResolvedValue(null);

    const result = await taskService.getTaskById(1);

    expect(result).toBeNull();
    expect(mockTaskRepository.getTaskById).toHaveBeenCalledOnce();
    expect(mockTaskRepository.getTaskById).toHaveBeenCalledWith(1);
  });

  it("should create task", async () => {
    const task: Task = { id: 1, title: "Task 1", completed: true };

    mockTaskRepository.createTask.mockResolvedValue(task);

    const result = await taskService.createTask("Task 1");

    expect(result).toEqual(task);
    expect(mockTaskRepository.createTask).toHaveBeenCalledOnce();
    expect(mockTaskRepository.createTask).toHaveBeenCalledWith("Task 1");
  });

  it("should update the task", async () => {
    const task: Task = { id: 1, title: "Updated Task 1", completed: false };

    mockTaskRepository.updateTask.mockResolvedValue(task);

    const result = await taskService.updateTask(1, "Updated Task 1", false);

    expect(result).toEqual(task);
    expect(mockTaskRepository.updateTask).toHaveBeenCalledOnce();
    expect(mockTaskRepository.updateTask).toHaveBeenCalledWith(
      1,
      "Updated Task 1",
      false,
    );
  });

  it("update task should return null when repository returns null", async () => {
    mockTaskRepository.updateTask.mockResolvedValue(null);

    const result = await taskService.updateTask(1, "Updated Task 1", false);

    expect(result).toBeNull();
    expect(mockTaskRepository.updateTask).toHaveBeenCalledOnce();
    expect(mockTaskRepository.updateTask).toHaveBeenCalledWith(
      1,
      "Updated Task 1",
      false,
    );
  });

  it("should delete the task", async () => {
    mockTaskRepository.deleteTask.mockResolvedValue(true);

    const result = await taskService.deleteTask(1);

    expect(result).toEqual(true);
    expect(mockTaskRepository.deleteTask).toHaveBeenCalledOnce();
    expect(mockTaskRepository.deleteTask).toHaveBeenCalledWith(1);
  });

  it("delete task should return false when repository returns false", async () => {
    mockTaskRepository.deleteTask.mockResolvedValue(false);

    const result = await taskService.deleteTask(1);

    expect(result).toEqual(false);
    expect(mockTaskRepository.deleteTask).toHaveBeenCalledOnce();
    expect(mockTaskRepository.deleteTask).toHaveBeenCalledWith(1);
  });
});
