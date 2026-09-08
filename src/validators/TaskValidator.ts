type TaskValidationResult<T> =
  | {
      isValid: true;
      value: T;
    }
  | {
      isValid: false;
      error: string;
    };

export class TaskValidator {
  static validateTitle(title: unknown): TaskValidationResult<string> {
    if (typeof title !== "string" || title.trim().length === 0) {
      return {
        isValid: false,
        error: "Title is required and cannot be empty.",
      };
    }

    return {
      isValid: true,
      value: title.trim(),
    };
  }

  static validateCompleted(completed: unknown): TaskValidationResult<boolean> {
    if (typeof completed !== "boolean") {
      return {
        isValid: false,
        error: "Completed must be a boolean value.",
      };
    }

    return {
      isValid: true,
      value: completed,
    };
  }

  static validateUpdateData(
    title: unknown,
    completed: unknown,
  ): TaskValidationResult<{ title: string; completed: boolean }> {
    const titleValidation = this.validateTitle(title);
    if (!titleValidation.isValid) {
      return titleValidation;
    }

    const completedValidation = this.validateCompleted(completed);
    if (!completedValidation.isValid) {
      return completedValidation;
    }

    return {
      isValid: true,
      value: {
        title: titleValidation.value,
        completed: completedValidation.value,
      },
    };
  }
}
