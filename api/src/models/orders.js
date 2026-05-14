import { checkoutCart } from "#controllers/orders.js";
import knex from "#configs/database.js";
export async function createOrder(trx, userId, totalAmount, cartId) {
  //   if (!userId) throw new Error("userId missing");
  //   if (!totalAmount) throw new Error("totalAmount missing");
  //   if (!cartId) throw new Error("cartId missing");
  //   console.log(userId, totalAmount, cartId);
  const [order] = await trx("customer_order")
    .insert({
      user_id: userId,
      total_amount: totalAmount ?? 0,
      cart_id: cartId,
    })
    .returning("*");
  return order;
}
export async function createOrderItems(trx, orderId, cartItems) {
  console.log("CART ITEMS:", cartItems);
  const items = cartItems.map((item) => ({
    order_id: orderId,
    event_id: item.id,
    event_title: item.title,
    quantity: item.quantity,
    price: item.price,
  }));

  return trx("order_item").insert(items);
}
export async function getOrdersByUser(userId) {
  return await knex("customer_order")
    .where({ user_id: userId })
    .orderBy("created_at", "desc");
}
export async function getOrderById(orderId, userId) {
  return await knex("customer_order")
    .where({
      order_id: orderId,
      user_id: userId,
    })
    .first();
}
export async function getOrderItems(orderId) {
  return await knex("order_item").where({
    order_id: orderId,
  });
}
