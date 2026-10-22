import "reflect-metadata";
import { beforeAll, describe, expect, it } from "vitest";
import { TaskCommentService } from "../src/services/TaskCommentService";
import { MockTaskCommentRepository } from "./mocks/MockTaskCommentRepository";
import { TaskComment } from "@task-manager/domain";

describe("Test TaskCommentService", () => {
  let taskCommentRepository: MockTaskCommentRepository;
  let taskCommentService: TaskCommentService;

  beforeAll(() => {
    taskCommentRepository = new MockTaskCommentRepository();
    taskCommentService = new TaskCommentService(taskCommentRepository);
  });

  it("given taskcomment from the repository, same taskcomment is returned by getCommentById", async () => {
    //Arrange
    const actualTaskComment: TaskComment = {
      id: 1,
      text: "testcommnet",
      taskid: 2,
    };
    taskCommentRepository.getCommentById.mockResolvedValue(actualTaskComment);

    //Act
    const result = await taskCommentService.getCommentById(1);

    //Assert
    expect(result).toEqual(actualTaskComment);
  });

  it("given taskcomments from the repository, same taskcomments are returned by the getAllCommentByTaskId", async () => {
    //Arrange
    const taskComments: TaskComment[] = [
      { id: 1, text: "test1", taskid: 2 },
      { id: 2, text: "test2", taskid: 2 },
    ];

    taskCommentRepository.getAllCommentsByTaskId.mockResolvedValue(
      taskComments,
    );

    //Act
    const result = await taskCommentService.getAllCommentByTaskId(2);

    //Assert
    expect(result).toEqual(taskComments);
  });
});
