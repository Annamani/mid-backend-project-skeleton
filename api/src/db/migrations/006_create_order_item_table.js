/**
 * @param {import("knex").Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable("order_item", (t) => {
    t.increments("order_item_id").primary();
    t.integer("order_id")
      .unsigned()
      .notNullable()
      .references("order_id")
      .inTable("customer_order")
      .onDelete("CASCADE");
    t.integer("event_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("events")
      .onDelete("RESTRICT");
    t.string("event_title").notNullable();
    t.integer("quantity").notNullable().defaultTo(1);
    t.decimal("price", 10, 2).notNullable();
    t.timestamps(true, true);
  });
}

/**
 * @param {import("knex").Knex} knex
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists("order_item");
}
