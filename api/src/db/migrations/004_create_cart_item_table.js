/**
 * @param {import("knex").Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable("cart_item", (t) => {
    t.increments("cart_item_id").primary();
    t.integer("cart_id")
      .unsigned()
      .notNullable()
      .references("cart_id")
      .inTable("cart")
      .onDelete("CASCADE");
    t.integer("event_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("events")
      .onDelete("CASCADE");
    t.integer("quantity").notNullable().defaultTo(1);
    t.decimal("price", 10, 2).notNullable();
    t.timestamps(true, true);
  });
}

/**
 * @param {import("knex").Knex} knex
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists("cart_item");
}
