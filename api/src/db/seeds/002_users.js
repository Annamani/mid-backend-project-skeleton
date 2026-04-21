/**
 * @param {import("knex").Knex} knex
 */
export async function seed(knex) {
  await knex("users").del(); // Clear existing users

  await knex("users").insert([
    {
      id: 1,
      name: "Anna Nielsen",
      email: "'anna@hyf.dk",
      password: "mypassword1",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Lucas Mortensen",
      email: "'lucas.mortensen@example.com",
      password: "mypassword2",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: "Sofia Hansen",
      email: "'sofia.hansen@testmail.com",
      password: "mypassword3",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
