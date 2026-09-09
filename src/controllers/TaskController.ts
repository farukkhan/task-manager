import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { inject, injectable } from "tsyringe";
import { ILogger } from "../logging/ILogger";
import { TaskIdParamDto } from "../dtos/TaskIdParamDto";
import { CreateTaskDto } from "../dtos/CreateTaskDto";
import { UpdateTaskDto } from "../dtos/UpdateTaskDto";

@injectable()
export class TaskController {
  constructor(
    @inject(TaskService) private taskService: TaskService,
    @inject("ILogger") private logger: ILogger,
  ) {}

  async getTasks(req: Request, res: Response) {
    const tasks = await this.taskService.getTasks();

    res.status(200).json(tasks);
  }

  async getTaskById(
    req: Request,
    res: Response,
    taskIdParamDto: TaskIdParamDto,
  ) {
    const task = await this.taskService.getTaskById(taskIdParamDto.id);

    if (task === null) {
      res.status(404).json({ error: "Task not found" });
      this.logger.warn(`Task not found with Id: ${req.params.id}`);
    } else {
      res.status(200).json(task);
    }
  }

  async createTask(req: Request, res: Response, createTaskDto: CreateTaskDto) {
    const createdTask = await this.taskService.createTask(createTaskDto.title);
    res.status(201).json(createdTask);
  }

  async updateTask(req: Request, res: Response, updateTaskDto: UpdateTaskDto) {
    const { title, completed } = req.body;

    const updatedTask = await this.taskService.updateTask(
      updateTaskDto.id,
      updateTaskDto.title,
      updateTaskDto.completed,
    );

    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(200).json(updatedTask);
    }
  }

  async deleteTask(
    req: Request,
    res: Response,
    taskIdParamDto: TaskIdParamDto,
  ) {
    const isDeleted = await this.taskService.deleteTask(taskIdParamDto.id);
    if (!isDeleted) {
      res.status(404).json({ error: "Task not found" });
      this.logger.warn(`Task not found with Id: ${req.params.id}`);
    } else {
      res.status(204).send();
    }
  }
}
