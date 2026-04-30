import express from "express";
import eventsRouter from "#routers/events.js";
import cartsRouter from "#routers/carts.js";

const apiRouter = express.Router();

apiRouter.use("/events", eventsRouter);
apiRouter.use("/carts", cartsRouter);

export default apiRouter;
