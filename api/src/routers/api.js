import express from "express";
import eventsRouter from "#routers/events.js";
import cartsRouter from "#routers/carts.js";
import authRouter from "#routers/auth.js";

const apiRouter = express.Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/events", eventsRouter);
apiRouter.use("/carts", cartsRouter);

export default apiRouter;
