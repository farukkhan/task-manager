

type TaskTitleValidationResult = {
  isValid: true;
}|{
  isValid: false;
  error: string;
};

export class TaskValidator{

static ValidateTitle(title: unknown): TaskTitleValidationResult {

    if(typeof title !== "string" || title.trim().length === 0) {
        return {
            isValid: false,
            error: "Title is required and cannot be empty."
        };
    }

    return {
        isValid: true
    };
}

}
