import { CustomError } from "./custom-error";
export class NotFoundResourceError extends CustomError {
  statusCode = 404;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundResourceError.prototype);  // required for extending a built-in class
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
