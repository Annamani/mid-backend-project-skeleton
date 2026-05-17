/**
 * @param {import("knex").Knex} knex
 */
export async function seed(knex) {
  // Clear existing carts
  await knex("cart").truncate();

  await knex("cart").insert([
    {
      user_id: 1,
      session_id: null,
      status: "active",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: null,
      session_id: "guest_12345",
      status: "active",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
