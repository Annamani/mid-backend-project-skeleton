import express from "express";
import {
  getCart,
  getCartById,
  postCartItem,
  updateCartItem,
  deleteCartItem,
} from "#controllers/carts.js";
import { checkoutCart } from "#controllers/orders.js";
import { authMiddleware } from "#middlewares/auth.js";
const cartsRouter = express.Router();

/**
 * @swagger
 * /api/carts:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     summary: Get current user cart
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     cartId:
 *                       type: integer
 *                     items:
 *                       type: array
 *                     subtotal:
 *                       type: number
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
 *     summary: Get cart by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart details
 *       404:
 *         description: Cart not found
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
 *                 example: 1
 *     responses:
 *       200:
 *         description: Item added successfully
 */
cartsRouter.post("/items", authMiddleware, postCartItem);
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
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item updated successfully
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
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 */
cartsRouter.delete("/items/:itemId", authMiddleware, deleteCartItem);
/**
 * @swagger
 * /api/carts/checkout:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     summary: Checkout cart and create order
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     order_id:
 *                       type: integer
 *                     total_amount:
 *                       type: number
 */
cartsRouter.post("/checkout", authMiddleware, checkoutCart);

export default cartsRouter;
