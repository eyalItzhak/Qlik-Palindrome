import express  from "express";
import { body, query } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { userController } from "../controllers/userController";
import { validateOnlyAllowedFieldsQuery } from "../middlewares/validate-only-allowed-fields";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
;

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("you must supply a password"),
  ],
  validateRequest,
  userController.signUp
);

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("you must supply a password"),
  ],
  validateRequest,
  userController.signIn
);


router.get(
  "/api/users/getUsersByFilter",
  [
    validateOnlyAllowedFieldsQuery([ "id","email", "permission" ,"page", "limit"]),
    query("permission").optional().isString(),
    query("email").optional().isEmail().withMessage("Email must be valid"),
    query("id").optional().isString().withMessage("Id must be valid string"),
    query("page").optional().isNumeric().withMessage("page must be valid number"),
    query("limit").optional().isNumeric().withMessage("limit must be valid number"),
  ],
  validateRequest,
  currentUser,
  requireAuth(),
  userController.getUsers
);

router.get("/api/users/currentuser", currentUser, userController.howAmI);
router.post("/api/users/logout", currentUser, userController.logOut);

router.delete("/api/users/deleteUser", [
  body("password").notEmpty().withMessage("Id must be valid string"),
],
  validateRequest,
  currentUser,
  requireAuth(),
  userController.deleteUser
) //delete user by id


export { router as userRoutetr };