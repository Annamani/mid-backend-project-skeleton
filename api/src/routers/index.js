import express from "express";
import apiRouter from "#routers/api.js";
import dotenv from "dotenv";
dotenv.config();
const rootRouter = express.Router();

rootRouter.use("/api", apiRouter);

export default rootRouter;
