/**
 * @param {import("knex").Knex} knex
 */
export async function up(knex) {
  return knex.raw(`
    CREATE UNIQUE INDEX unique_active_cart_per_user 
    ON cart (user_id) 
    WHERE (status = 'active' AND user_id IS NOT NULL);
  `);
}

/**
 * @param {import("knex").Knex} knex
 */
export async function down(knex) {
  return knex.raw(`DROP INDEX IF Exists unique_active_cart_per_user;`);
}
