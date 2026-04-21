/**
 * @param {import("knex").Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable("customer_order", (t) => {
    t.increments("order_id").primary();
    t.integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    t.integer("cart_id")
      .unsigned()
      .references("cart_id")
      .inTable("cart")
      .onDelete("SET NULL");
    t.decimal("total_amount", 10, 2).notNullable();
    t.timestamps(true, true);
  });
}

/**
 * @param {import("knex").Knex} knex
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists("customer_order");
}
