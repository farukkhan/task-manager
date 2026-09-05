import { Request, Response } from "express";
import {TaskService} from "../services/TaskService";

export class TaskController{

constructor(private taskService: TaskService){}

 async GetTasks(req: Request, res: Response){

   const tasks =await this.taskService.getTasks();

   res.status(200).json(tasks);

 }


}