/**
 * @param {import("knex").Knex} knex
 */
export async function seed(knex) {
  await knex("customer_order").del();

  await knex("customer_order").insert([
    {
      order_id: 1,
      user_id: 1,
      cart_id: 1,
      total_amount: 200.0,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
