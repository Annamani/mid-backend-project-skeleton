import { listCartItems, getCartSubtotal } from "#models/carts.js";
import db from "#configs/database.js";

async function getCartDetails(cartId) {
  const cartExists = await db("cart").where({ cart_id: cartId }).first();
  if (!cartExists) return null;
  const [items, subtotal] = await Promise.all([
    listCartItems(cartId),
    getCartSubtotal(cartId),
  ]);

  return {
    id: cartId,
    items,
    subtotal,
  };
}

export async function getCartById(req, res, next) {
  try {
    const { id } = req.params;
    const cart = await getCartDetails(Number(id));
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json({ data: cart });
  } catch (err) {
    next(err);
  }
}
