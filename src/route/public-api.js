import express from "express";
import loginController from "../controller/login-controller.js";

const publicRouter = new express.Router();

publicRouter.post("/api/users", loginController.register);
publicRouter.post("/api/users/login", loginController.login);

export { publicRouter };
