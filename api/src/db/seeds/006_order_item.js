/**
 * @param {import("knex").Knex} knex
 */
export async function seed(knex) {
  await knex("order_item").del();

  await knex("order_item").insert([
    {
      order_id: 1,
      event_id: 1,
      event_title: "Copenhagen Coffee Crawl",
      quantity: 1,
      price: 100,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
