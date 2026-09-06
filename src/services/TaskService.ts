import { Task } from "../models/Task";
import {ITaskRepository} from "../repositories/ITaskRepository";
import {injectable, inject} from "tsyringe";


@injectable()
export class TaskService{

constructor(@inject("ITaskRepository") private taskRepository: ITaskRepository){

}

async getTasks()
{
  return this.taskRepository.getTasks();
}

async getTaskById(id:number)
{
  return this.taskRepository.getTaskById(id);
}

async createTask(title:string): Promise<Task>
{
  return this.taskRepository.createTask(title);
}

}