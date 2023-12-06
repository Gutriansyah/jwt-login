import express from "express";
import { authMiddleware } from "../middleware/auth-middlware.js";
import loginController from "../controller/login-controller.js";

const userRouter = new express.Router();

userRouter.use(authMiddleware);
userRouter.get("/api/users/current", loginController.get);
userRouter.get("/api/users/search", loginController.search);

export { userRouter };
