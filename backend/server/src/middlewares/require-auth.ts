import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { Permissions } from "../models/users";

const PermissionLevels = {
  [Permissions.USER]: 0 , 
  [Permissions.ADMIN]: 1,
}  ;



export const requireAuth = (topermission: Permissions = Permissions.USER) => {

  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      throw new NotAuthorizedError();
    }
    const userPermission = req.currentUser.permission;
    const userLevel = PermissionLevels[userPermission] || 0;

    if ( PermissionLevels[topermission] > userLevel) {
      throw new NotAuthorizedError();
    }

    next();
  };

}

