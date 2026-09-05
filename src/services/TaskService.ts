import {ITaskRepository} from "../repositories/ITaskRepository";

export class TaskService{

constructor(private taskRepository: ITaskRepository){

}

async getTasks()
{
  return this.taskRepository.getTasks();
}

}