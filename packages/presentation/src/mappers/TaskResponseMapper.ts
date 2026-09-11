import { TaskResponseDto } from "../dtos/TaskResponseDto";
import { Task } from "@task-manager/domain";

export class TaskResponseMapper {
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
