import express from "express";
import {
  getCart,
  getCartById,
  postCartItem,
  updateCartItem,
  deleteCart,
} from "#controllers/carts.js";
import { checkoutCart } from "#controllers/orders.js";
import { authMiddleware } from "#middlewares/auth.js";
const cartsRouter = express.Router();

/**
 * GET /api/carts/:id
 * This will return the items + the subtotal we calculated
 *
 */
/**
 * @swagger
 * /api/carts:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     summary: Get user cart
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 */
cartsRouter.get("/", authMiddleware, getCart);
/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     summary: Get cart by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart details
 */
cartsRouter.get("/:id", authMiddleware, getCartById);
/**
 * @swagger
 * /api/carts/items:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     summary: Add item to cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *             properties:
 *               eventId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item added
 */
cartsRouter.post("/items", postCartItem);
/**
 * @swagger
 * /api/carts/items/{itemId}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     summary: Update cart item quantity
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated successfully
 */
cartsRouter.put("/items/:itemId", authMiddleware, updateCartItem);
/**
 * @swagger
 * /api/carts/items/{itemId}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     summary: Delete cart item
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
cartsRouter.delete("/items/:itemId", authMiddleware, deleteCart);
cartsRouter.post("/checkout", authMiddleware, checkoutCart);
export default cartsRouter;
