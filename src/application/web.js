import express from "express";
import { publicRouter } from "../route/public-api.js";
import { erroMidlleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";

const web = express();
web.use(express.json());

web.use(publicRouter);
web.use(userRouter);

web.use(erroMidlleware);

export { web };
