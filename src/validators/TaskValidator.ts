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
  static ValidateTitle(title: unknown): TaskValidationResult<string> {
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

  static ValidateCompleted(completed: unknown): TaskValidationResult<boolean> {
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

  static ValidateUpdateData(
    title: unknown,
    completed: unknown,
  ): TaskValidationResult<{ title: string; completed: boolean }> {
    const titleValidation = this.ValidateTitle(title);
    if (!titleValidation.isValid) {
      return titleValidation;
    }

    const completedValidation = this.ValidateCompleted(completed);
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
