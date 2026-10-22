import { TaskComment } from "@task-manager/domain";

export interface ITaskCommentRepository {
  getCommentById(id: number): Promise<TaskComment>;
  getAllCommentsByTaskId(id: number): Promise<TaskComment[]>;
}
