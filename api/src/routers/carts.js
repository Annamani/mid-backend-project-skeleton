import express from "express";
import { getCartById } from "#controllers/carts.js";

const cartsRouter = express.Router();

/**
 * GET /api/carts/:id
 * This will return the items + the subtotal we calculated
 */
cartsRouter.get("/:id", getCartById);

export default cartsRouter;
