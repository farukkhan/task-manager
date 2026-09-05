import {ITaskRepository} from "./ITaskRepository";
import { Task } from "../models/Task";


export class TaskRepository implements ITaskRepository {
  private tasks: Task[] = [{id:1, title:"Task 1", completed:false}, {id:2, title:"Task 2", completed:true}];

  async getTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async getTaskById(id: number): Promise<Task | null> {
    return this.tasks.find(task => task.id === id) || null;
  }
}
