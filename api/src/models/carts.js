import db from "#configs/database.js";

const EVENT_TABLE = "event";
const CART_TABLE = "cart";
const CART_ITEM_TABLE = "cart_item";

export async function getOrCreateCart({ userId, sessionId, trx = db }) {
  let cart;

  // 1. Try find existing cart
  if (userId) {
    cart = await trx(CART_TABLE)
      .where({ user_id: userId, status: "active" })
      .first();
  } else {
    cart = await trx(CART_TABLE)
      .where({ session_id: sessionId, status: "active" })
      .first();
  }

  if (cart) return cart;

  // 2. Create new cart
  const [cartId] = await trx(CART_TABLE).insert({
    user_id: userId ?? null,
    session_id: sessionId ?? null,
    status: "active",
  });

  // 3. Return created cart safely
  return trx(CART_TABLE).where({ cart_id: cartId }).first();
}

export async function addToCart(
  cartId,
  eventId,
  quantity = 1,
  { trx = db } = {},
) {
  const event = await trx(EVENT_TABLE).where({ id: eventId }).first();

  if (!event) throw new Error("Event not found");

  // check existing item
  const existingItem = await trx(CART_ITEM_TABLE)
    .where({ cart_id: cartId, event_id: eventId })
    .first();

  if (existingItem) {
    const newQty = existingItem.quantity + quantity;

    await trx(CART_ITEM_TABLE)
      .where({ cart_item_id: existingItem.cart_item_id })
      .update({ quantity: newQty });

    return trx(CART_ITEM_TABLE)
      .where({ cart_item_id: existingItem.cart_item_id })
      .first();
  }

  // insert new item
  const [itemId] = await trx(CART_ITEM_TABLE).insert({
    cart_id: cartId,
    event_id: eventId,
    quantity,
    price: event.price,
  });

  return trx(CART_ITEM_TABLE).where({ cart_item_id: itemId }).first();
}

export async function getCartSubtotal(cartId, { trx = db } = {}) {
  const result = await trx(CART_ITEM_TABLE)
    .where({ cart_id: cartId })
    .select(db.raw("SUM(price * quantity) as subtotal"))
    .first();

  return Number(result?.subtotal || 0);
}

export async function listCartItems(cartId, { trx = db } = {}) {
  return trx(CART_ITEM_TABLE)
    .join(EVENT_TABLE, `${CART_ITEM_TABLE}.event_id`, `${EVENT_TABLE}.id`)
    .where(`${CART_ITEM_TABLE}.cart_id`, cartId)
    .select(
      `${CART_ITEM_TABLE}.cart_item_id`,
      `${CART_ITEM_TABLE}.quantity`,
      `${CART_ITEM_TABLE}.price`,
      `${EVENT_TABLE}.title`,
      `${EVENT_TABLE}.currency`,
    );
}

export async function debugCart(cartId) {
  console.log("DEBUGGING CART to identify the issue");

  const items = await db(CART_ITEM_TABLE).where({ cart_id: cartId });
  console.log("cart_item rows:", items);

  const join = await db(CART_ITEM_TABLE)
    .join(EVENT_TABLE, "cart_item.event_id", "event.id")
    .where({ "cart_item.cart_id": cartId });

  console.log("JOIN result:", join);
}
