/**
 * @param {import("knex").Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable("cart", (t) => {
    t.increments("cart_id").primary();
    t.integer("user_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    t.string("session_id").nullable();
    t.enu("status", ["active", "checkout", "completed", "cancelled"])
      .notNullable()
      .defaultTo("active");
    t.timestamps(true, true);
  });
  await knex.schema.alterTable("cart", (table) => {
    table.unique(["user_id", "status"]);
    table.unique(["session_id", "status"]);
  });
}

/**
 * @param {import("knex").Knex} knex
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists("cart");
}
