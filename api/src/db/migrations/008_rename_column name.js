/**
 * @param {import("knex").Knex} knex
 */
export async function up(knex) {
  await knex.schema.alterTable("cart_item", (table) => {
    table.renameColumn("price", "price_snapshot");
  });
}

/**
 * @param {import("knex").Knex} knex
 */
export async function down(knex) {
  await knex.schema.alterTable("cart_item", (table) => {
    table.renameColumn("price_snapshot", "price");
  });
}
