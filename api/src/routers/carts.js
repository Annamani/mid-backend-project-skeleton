import express from "express";
import { getCartById, postCartItem } from "#controllers/carts.js";

const cartsRouter = express.Router();

/**
 * GET /api/carts/:id
 * This will return the items + the subtotal we calculated
 */
cartsRouter.get("/:id", getCartById);
cartsRouter.post("/cart-items", postCartItem);
export default cartsRouter;
