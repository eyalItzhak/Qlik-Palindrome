import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/BadRequestError";


export const validateOnlyAllowedFieldsBody = (allowedFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const invalidFields = Object.keys(req.body).filter((key) => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
      throw new BadRequestError(`Invalid field(s) found: ${invalidFields.join(", ")}`);
    }
    next();
  };
};

export const validateOnlyAllowedFieldsQuery = (allowedFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const invalidFields = Object.keys(req.query).filter((key) => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
      throw new BadRequestError(`Invalid field(s) found in params: ${invalidFields.join(", ")}`);
    }
    next();
  };
};