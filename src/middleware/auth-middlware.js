import { prismaClient } from "../application/database.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res
            .status(401)
            .json({
                message: "Unauthorized",
            })
            .end();
    }

    const token = authorization.split(" ");
    const secret = process.env.JWT_SECRET;

    try {
        const jwtDecode = jwt.verify(token[1], secret);

        const user = await prismaClient.user.findUnique({
            where: {
                username: jwtDecode.username,
            },
            select: {
                username: true,
                name: true,
                email: true,
            },
        });
        if (!user) {
            res.status(401)
                .json({
                    message: "Unauthorized",
                })
                .end();
        } else {
            req.user = user;
            next();
        }
    } catch (error) {
        res.status(401)
            .json({
                message: error.message,
            })
            .end();
    }
};

export { authMiddleware };
