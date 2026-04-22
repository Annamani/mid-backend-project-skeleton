import db from "#configs/database.js";

const EVENT_TABLE = "event";
const USER_TABLE = "users";
const CART_TABLE = "cart";
const CART_ITEM_TABLE = "cart_item";
const CUSTOMER_ORDER_TABLE = "customer_order";
const ORDER_ITEM_TABLE = "order_item";

//trx means Run multiple queries as ONE unit. If something fails -undo everything.
function baseQuery(trx = db) {
  return trx(CART_TABLE);
}

//Calculate the cart subtotal to find items in cart and join with events to get the price of cart_items.
export async function getCartSubtotal(cartId, { trx = db } = {}) {
  const result = await trx(CART_ITEM_TABLE)
    .where(`${CART_ITEM_TABLE}.cart_id`, cartId)
    .sum({
      subtotal: trx.raw(
        `${CART_ITEM_TABLE}.quantity * ${CART_ITEM_TABLE}.price`,
      ),
    })
    .first();

  return Number(result?.subtotal || 0);
}

//List all items in a cart with event-details which includes event details (title, price, currency)
export async function listCartItems(cartId, { trx = db } = {}) {
  return trx(CART_ITEM_TABLE)
    .join(EVENT_TABLE, `${CART_ITEM_TABLE}.event_id`, `${EVENT_TABLE}.id`)
    .where(`${CART_ITEM_TABLE}.cart_id`, cartId)
    .select(
      `${CART_ITEM_TABLE}.id`,
      `${CART_ITEM_TABLE}.quantity`,
      `${CART_ITEM_TABLE}.unit_price`,
      `${EVENT_TABLE}.title`,
      `${EVENT_TABLE}.currency`,
    );
}
