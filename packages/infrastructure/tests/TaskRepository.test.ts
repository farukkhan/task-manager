import "reflect-metadata";
import { describe, expect, it, beforeEach } from "vitest";
import { TaskRepository } from "../src/repositories/TaskRepository";
import { prisma } from "../src/database/prisma";
import { Task } from "@task-manager/domain";

describe("TaskRepository integration tests", () => {
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    //Arrange
    await prisma.task.deleteMany();
    taskRepository = new TaskRepository();
  });

  it("task should be created in database", async () => {
    //Act
    await taskRepository.createTask("Test Task 1");

    //Assert
    var tasks = await prisma.task.findMany();
    expect(tasks.length).toEqual(1);
    expect(tasks[0].title).toEqual("Test Task 1");
  });

  it("all tasks should be fetched", async () => {
    //Arrange
    const tasks: Task[] = await seedTask();

    //Act
    const result = await taskRepository.getTasks();

    //Assert
    expect(result).toEqual(tasks);
  });

  it("tasks should be updated", async () => {
    //Arrange
    const tasks: Task[] = await seedTask();
    const taskToUpdate = tasks.at(-1);

    //Act
    const result = await taskRepository.updateTask(
      taskToUpdate!.id,
      "test task 2 updated",
      true,
    );

    //Assert
    const tasksAfterUpdate = await prisma.task.findMany();
    tasks[tasks.length - 1] = {
      id: taskToUpdate!.id,
      title: "test task 2 updated",
      completed: true,
    };

    expect(result).toEqual({
      id: taskToUpdate!.id,
      title: "test task 2 updated",
      completed: true,
    });

    expect(tasks).toEqual(tasksAfterUpdate);
  });

  it("tasks should be deleted", async () => {
    //Arrange
    const tasks: Task[] = await seedTask();
    const taskIdToDelete = tasks.at(-1)!.id;

    //Act
    const result = await taskRepository.deleteTask(taskIdToDelete);

    //Assert
    const tasksAfterDelete = await prisma.task.findMany();

    expect(result).toEqual(true);
    expect(tasksAfterDelete).toEqual(
      tasks.filter((task) => task.id != taskIdToDelete),
    );
  });
});

async function seedTask(): Promise<Task[]> {
  const tasks = [
    { title: "test task 1", completed: false },
    { title: "test task 2", completed: false },
  ];

  const createdTasks = await prisma.task.createManyAndReturn({ data: tasks });

  return createdTasks;
}
