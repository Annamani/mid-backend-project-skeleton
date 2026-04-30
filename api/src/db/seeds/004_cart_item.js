/**
 * @param {import("knex").Knex} knex
 */
export async function seed(knex) {
  await knex("cart_item").truncate(); // Clear existing users

  await knex("cart_item").insert([
    {
      cart_id: 1,
      event_id: 1,
      quantity: 2,
      price: 100, // event_id price is 100 per 1
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
