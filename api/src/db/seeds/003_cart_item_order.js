/**
 * @param { import("knex").Knex } knex
 */
export async function seed(knex) {
  return knex.raw(`
  SELECT * FROM event
ORDER BY created_at DESC
limit 10 OFFSET 0;
`);
}
