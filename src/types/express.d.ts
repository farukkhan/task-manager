declare global {
  namespace Express {
    interface Request {
      taskId?: number;
    }
  }
}

export {};
