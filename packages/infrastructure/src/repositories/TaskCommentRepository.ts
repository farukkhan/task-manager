import { ITaskCommentRepository } from "@task-manager/application";
import { TaskComment } from "@task-manager/domain";

export class TaskCommentRepository implements ITaskCommentRepository {
  getCommentById(id: number): Promise<TaskComment> {
    return Promise.resolve({ id: 1, text: "test", taskid: 2 });
  }

  getAllCommentsByTaskId(id: number): Promise<TaskComment[]> {
    return Promise.resolve([]);
  }
}
