import {
  addToCart,
  getOrCreateCart,
  getCartSubtotal,
  listCartItems,
  getCartByIdRaw,
} from "#models/carts.js";
import {
  createOrder,
  createOrderItems,
  getOrdersByUser,
  getOrderById,
  getOrderItems,
} from "#models/orders.js";
import knex from "#configs/database.js";
import z from "zod";
//cart ID schema
const idSchema = z.object({
  id: z.coerce.number().int().positive(),
});
// post /api/cart/checkout
export async function checkoutCart(req, res, next) {
  try {
    const userId = req.user?.id ?? null;
    const sessionId = req.sessionID ?? req.headers["x-session-id"] ?? null;
    if (!userId && !sessionId) {
      return res.status(400).json({
        status: "error",
        message: "Missing sessionId or user authentication",
      });
    }
    const cart = await getOrCreateCart({ userId, sessionId });
    const cartItems = (await listCartItems(cart.cart_id)) || [];
    if (!cartItems.length) {
      return res.status(400).json({
        status: "error",
        message: "Cart is empty",
      });
    }
    const subtotal = await getCartSubtotal(cart.cart_id);
    //console.log(subtotal);
    const order = await knex.transaction(async (trx) => {
      const newOrder = await createOrder(trx, userId, subtotal, cart.cart_id);
      // prepare order items
      await createOrderItems(trx, newOrder.order_id, cartItems);
      await trx("cart_item").where({ cart_id: cart.cart_id }).del();
      return newOrder;
    });
    // const orderWithItems = await getOrderById(order.id, userId);
    // return res.status(201).json({
    //   data: {
    //     id: orderWithItems.id,
    //     status: orderWithItems.status,
    //     items: orderWithItems.items,
    //     total: total.toFixed(2),
    //     created_at: orderWithItems.created_at,
    //   },
    // });
    return res.status(201).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    next(error);
  }
}
//get /api/orders
export async function getOrders(req, res, next) {
  try {
    const orders = await getOrdersByUser(req.user.id);
    return res.json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
}
// get /api/orders/:id
export async function getOrder(req, res, next) {
  try {
    const parsed = idSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({
        status: "error",
        message: "Invalid order id",
      });
    }
    const order = await getOrderById(parsed.data.id, req.user.id);
    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }
    const items = await getOrderItems(order.order_id);
    return res.json({
      status: "success",
      data: {
        ...order,
        items,
      },
    });
  } catch (error) {
    next(error);
  }
}
