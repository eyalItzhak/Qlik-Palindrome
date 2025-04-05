import jwt from "jsonwebtoken";

const generateUserJwt = (user: { id: string, email: string, permission: string }) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            permission: user.permission,
        },
        process.env.JWT_KEY!
    );
};

export const authService = { generateUserJwt };