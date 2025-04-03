import express from 'express';
import { currentUser } from '../middlewares/current-user';
import { validateRequest } from '../middlewares/validate-request';
import { body, query } from "express-validator";
import { requireAuth } from '../middlewares/require-auth';
import { messageController } from '../controllers/messageController';
import { Permissions } from '../models/users';
import { validateOnlyAllowedFieldsQuery } from '../middlewares/validate-only-allowed-fields';

const router = express.Router();

router.post(
    "/api/messages/postMessage",
    [
        body("messageContent").notEmpty().withMessage("Message content must not be empty").isString().withMessage("Message content must be a string"),
    ],
    validateRequest,
    currentUser,
    requireAuth(),
    messageController.postMessage
);

router.get(
    "/api/messages/getMyMessage",
    validateOnlyAllowedFieldsQuery([ "id","isPalindrome","page", "limit"]),
    [query("id").optional().isMongoId().withMessage("Invalid message ID"),
    query("isPalindrome").optional().isBoolean().withMessage("isPalindrome must be a boolean")],
    validateRequest,
    currentUser,
    requireAuth(),
    messageController.getMyMessages
)

router.get(
    "/api/messages/getAllMssages",
    [query("userId").optional().isMongoId().withMessage("Invalid message ID"),
    query("isPalindrome").optional().isBoolean().withMessage("isPalindrome must be a boolean"),
    query("email").optional().isEmail().withMessage("Invalid email"),
    query("content").optional().isString().withMessage("Invalid content - must be a string"),
    ],
    validateRequest,
    currentUser,
    requireAuth(Permissions.ADMIN),
    messageController.getAllUserMsg
)


router.delete("/api/messages/deleteMessage", [
    body("id").notEmpty().withMessage("Id must not be empty").isMongoId().withMessage("must be a valid mongo id"),
] , validateRequest,currentUser, requireAuth(), messageController.deleteMessage)

router.patch("/api/messages/updateMessage",[
    body("id").notEmpty().withMessage("Id must not be empty").isMongoId().withMessage("must be a valid mongo id"),
    body("content").notEmpty().isString().withMessage("Content must be a string")
] , validateRequest,currentUser, requireAuth(), messageController.updateMessage)



export { router as messageRouter };