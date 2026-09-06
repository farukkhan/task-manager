import { Request, Response } from "express";
import {TaskService} from "../services/TaskService";
import { inject, injectable } from "tsyringe";

@injectable()
export class TaskController{

constructor(@inject(TaskService) private taskService: TaskService){}

async GetTasks(req: Request, res: Response){

 const tasks =await this.taskService.getTasks();

 res.status(200).json(tasks);

}

async GetTaskById(req: Request, res: Response){
 const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
 const id = parseInt(idParam, 0);
 const task = await this.taskService.getTaskById(id);
 res.status(200).json(task);
}

async CreateTask(req: Request, res: Response){
 const {title} = req.body;
 const createdTask = await this.taskService.createTask(title);
 res.status(201).json(createdTask);
}

}