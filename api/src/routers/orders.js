import express from "express";
import { getOrders, getOrder } from "#controllers/orders.js";
import { authMiddleware } from "#middlewares/auth.js";
const router = express.Router();

router.get("/", authMiddleware, getOrders);
router.get("/:id", authMiddleware, getOrder);
export default router;
