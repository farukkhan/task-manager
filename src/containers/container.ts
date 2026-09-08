import { container } from "tsyringe";
import { TaskRepository } from "../repositories/TaskRepository";
import { Logger } from "../logging/Logger";

container.register("ITaskRepository", { useClass: TaskRepository });
container.register("ILogger", { useClass: Logger });

export { container };
