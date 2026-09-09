import { Task } from "../models/Task";
import { TaskResponseDto } from "../dtos/TaskResponseDto";

export class TaskMapper {
  static toResponseDto(task: Task): TaskResponseDto {
    return {
      id: task.id,
      title: task.title,
      completed: task.completed,
    };
  }

  static toResponseDtoList(tasks: Task[]): TaskResponseDto[] {
    return tasks.map((task) => this.toResponseDto(task));
  }
}
