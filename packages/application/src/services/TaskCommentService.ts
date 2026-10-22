import { inject } from "tsyringe";
import { TaskComment } from "@task-manager/domain";
import { ITaskCommentRepository } from "../ports/ITaskCommentRepository";

export class TaskCommentService {
  constructor(
    @inject("ITaskCommentRepository")
    private readonly taskCommentRepository: ITaskCommentRepository,
  ) {}

  async getCommentById(id: number): Promise<TaskComment> {
    return await this.taskCommentRepository.getCommentById(id);
  }

  async getAllCommentByTaskId(taskid: number): Promise<TaskComment[]> {
    return await this.taskCommentRepository.getAllCommentsByTaskId(taskid);
  }
}
