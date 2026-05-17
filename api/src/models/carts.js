import knex from "#configs/database.js";

const EVENT_TABLE = "event";
const CART_TABLE = "cart";
const CART_ITEM_TABLE = "cart_item";

export async function getCartByIdRaw(cartId) {
  return knex("cart").where({ cart_id: cartId }).first();
}

export async function getOrCreateCart({ userId, sessionId, trx = knex }) {
  let cart;
  if (!userId && !sessionId) {
    throw new Error("sessionId is required for guest carts");
  }
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
  const [cartId] = await trx(CART_TABLE).insert({
    user_id: userId ?? null,
    session_id: sessionId ?? null,
    status: "active",
  });
  return trx(CART_TABLE).where({ cart_id: cartId }).first();
}

export async function addToCart(
  cartId,
  eventId,
  quantity = 1,
  { trx = knex } = {},
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
    price_snapshot: event.price,
  });

  return trx(CART_ITEM_TABLE).where({ cart_item_id: itemId }).first();
}

export async function getCartSubtotal(cartId, { trx = knex } = {}) {
  const result = await trx(CART_ITEM_TABLE)
    .where({ cart_id: cartId })
    .select(knex.raw("SUM(price_snapshot * quantity) as subtotal"))
    .first();

  return Number(result?.subtotal || 0);
}

export async function listCartItems(cartId, { trx = knex } = {}) {
  return trx(CART_ITEM_TABLE)
    .join(EVENT_TABLE, `${CART_ITEM_TABLE}.event_id`, `${EVENT_TABLE}.id`)
    .where(`${CART_ITEM_TABLE}.cart_id`, cartId)
    .select(
      `${CART_ITEM_TABLE}.cart_item_id`,
      `${CART_ITEM_TABLE}.quantity`,
      `${CART_ITEM_TABLE}.price_snapshot`,
      `${EVENT_TABLE}.title`,
      `${EVENT_TABLE}.id`,
      `${EVENT_TABLE}.event_date`,
      `${EVENT_TABLE}.event_location`,
      `${EVENT_TABLE}.currency`,
    );
}
