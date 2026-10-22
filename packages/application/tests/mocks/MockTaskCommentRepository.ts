import { vi } from "vitest";
import { ITaskCommentRepository } from "../../src/ports/ITaskCommentRepository";
import { TaskComment } from "@task-manager/domain";

export class MockTaskCommentRepository implements ITaskCommentRepository {
  getCommentById = vi.fn<(id: number) => Promise<TaskComment>>();
  getAllCommentsByTaskId = vi.fn<(taskid: number) => Promise<TaskComment[]>>();
}
