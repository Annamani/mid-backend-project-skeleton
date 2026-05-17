import express from "express";
import eventsRouter from "#routers/events.js";
import cartsRouter from "#routers/carts.js";
import authRouter from "#routers/auth.js";
import orderRouter from "#routers/orders.js";
const apiRouter = express.Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/events", eventsRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/orders", orderRouter);
apiRouter.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API is running ",
  });
});
export default apiRouter;
