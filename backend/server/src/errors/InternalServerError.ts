import { CustomError } from "./custom-error";
export class InternalServerError extends CustomError {
  statusCode = 500;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, InternalServerError.prototype);  // required for extending a built-in class
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
