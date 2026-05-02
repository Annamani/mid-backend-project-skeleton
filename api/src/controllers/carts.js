import {
  addToCart,
  getOrCreateCart,
  getCartSubtotal,
  listCartItems,
  getCartByIdRaw,
} from "#models/carts.js";

export async function getCartById(req, res, next) {
  try {
    const { id } = req.params;
    //If cart does not exist
    const cart = await getCartByIdRaw(Number(id));
    if (!cart) {
      return res.status(404).json({
        error: "Cart not found",
      });
    }
    //If cart does  exists
    const items = await listCartItems(Number(id));
    const subtotal = await getCartSubtotal(Number(id));

    res.json({
      data: {
        id: Number(id),
        items,
        subtotal,
      },
    });
  } catch (err) {
    next(err);
  }
}
export async function postCartItem(req, res, next) {
  try {
    const { eventId, quantity = 1 } = req.body;
    const eventIdNum = Number(eventId);
    if (
      !eventId ||
      Number.isNaN(eventIdNum) ||
      !Number.isInteger(eventIdNum) ||
      eventIdNum <= 0
    ) {
      return res.status(400).json({
        error: "eventId must be a positive integer",
      });
    }

    const qty = Number(quantity);
    if (Number.isNaN(qty) || qty <= 0) {
      return res.status(400).json({ error: "quantity must be > 0" });
    }
    const userId = req.user?.id ?? null;
    const sessionId = req.sessionID ?? req.headers["x-session-id"] ?? null;

    if (!userId && !sessionId) {
      return res.status(400).json({
        error: "No user or session context found",
      });
    }

    const cart = await getOrCreateCart({ userId, sessionId });

    if (!cart?.cart_id) {
      return res.status(500).json({
        error: "Failed to create or retrieve cart",
      });
    }

    const item = await addToCart(cart.cart_id, eventId, qty);

    res.status(201).json({
      data: item,
      cartId: cart.cart_id,
    });
  } catch (err) {
    next(err);
  }
}
