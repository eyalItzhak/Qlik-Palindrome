export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype); // required for extending a built-in class
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
