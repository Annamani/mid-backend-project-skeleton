import {
  addToCart,
  getOrCreateCart,
  getCartSubtotal,
  listCartItems,
  getCartByIdRaw,
} from "#models/carts.js";
import knex from "#configs/database.js";
import z from "zod";

//cart ID schema
const cartIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});
//adding carts schema
const addCartItemSchema = z.object({
  eventId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive().default(1),
});
//update carts schema
const updateCartItemSchema = z.object({
  id: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive().min(1),
});

//GET carts -- /api/cart
export async function getCart(req, res, next) {
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
    if (!cart?.cart_id) {
      return res.status(500).json({
        status: "error",
        message: "Failed to retrieve cart",
      });
    }

    const items = await listCartItems(cart.cart_id);
    const subtotal = await getCartSubtotal(cart.cart_id);
    return res.json({
      status: "success",
      data: {
        cartId: cart.cart_id,
        items,
        subtotal,
        sessionId,
      },
    });
  } catch (error) {
    next(error);
  }
}
//GET cart by Id -- /api/cart/:id
export async function getCartById(req, res, next) {
  try {
    const result = cartIdSchema.safeParse(req.params);
    if (!result.success) {
      return res.status(400).json({
        status: "error",
        message: "Invalid cart id",
        issues: result.error.issues,
      });
    }
    const { id } = result.data;
    const cart = await getCartByIdRaw(id);
    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Cart item not found",
      });
    }
    res.json({
      status: "success",
      data: cart,
    });
  } catch (err) {
    next(err);
  }
}
//post cart by --/api/items
export async function postCartItem(req, res, next) {
  try {
    const postCart = addCartItemSchema.safeParse(req.body);
    if (!postCart.success) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        issues: postCart.error.issues,
      });
    }
    const { eventId, quantity } = postCart.data;
    const userId = req.user?.id ?? null;
    const sessionId = req.sessionID ?? req.headers["x-session-id"] ?? null;
    if (!userId && !sessionId) {
      return res.status(400).json({
        status: "error",
        message: "Missing sessionId or user authentication",
      });
    }
    const cart = await getOrCreateCart({ userId, sessionId });
    if (!cart?.cart_id) {
      return res.status(500).json({
        status: "error",
        message: "Failed to create or retrieve cart",
      });
    }
    const item = await addToCart(cart.cart_id, eventId, quantity);

    return res.json({
      status: "success",
      data: {
        cartId: cart.cart_id,
        item,

        sessionId,
      },
    });
  } catch (err) {
    next(err);
  }
}
//put cart -- /items/:itemId
export async function updateCartItem(req, res, next) {
  try {
    // validate params + body together
    const parsed = updateCartItemSchema.safeParse({
      id: req.params.id,
      quantity: req.body.quantity,
    });
    if (!parsed.success) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        issues: parsed.error.issues,
      });
    }
    const { id, quantity } = parsed.data;
    // check if item exists
    const existing = await knex("cart_items").where({ id }).first();
    if (!existing) {
      return res.status(404).json({
        status: "error",
        message: "Cart not found",
      });
    }

    // update item
    const [updated] = await knex("cart_items")
      .where({ id })
      .update({ quantity })
      .returning("*");
    res.json({
      status: "success",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}
//delete /items/:itemId
export async function deleteCartItem(req, res, next) {
  try {
    const result = cartIdSchema.safeParse({ id: req.params.itemId });
    if (!result.success) {
      return res.status(400).json({
        status: "error",
        message: "Invalid cart id",
        issues: result.error.issues,
      });
    }
    const { id } = result.data;
    // check cart item exists in cart_item table
    const existingCart = await knex("cart_item")
      .where({ cart_item_id: id })
      .first();
    if (!existingCart) {
      return res.status(404).json({
        status: "error",
        message: "Cart item not found",
      });
    }
    //  delete items first from cart_items table
    await knex("cart_item").where({ cart_item_id: id }).del();
    return res.json({
      status: "success",
      message: "Cart deleted successfully",
      data: {
        id,
      },
    });
  } catch (error) {
    next(error);
  }
}
