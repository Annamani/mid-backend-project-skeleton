const client = process.env.DB_CLIENT ?? "sqlite3";
import path from "path";

const defaultDbFilename =
  client === "sqlite3"
    ? path.resolve(process.cwd(), "src/db/database.sqlite")
    : null;

export function createKnexConfig() {
  return {
    client,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      filename: process.env.DB_SQLITE_FILENAME ?? defaultDbFilename,
      ssl:
        process.env.DB_USE_SSL === "true"
          ? { rejectUnauthorized: false }
          : false,
    },
    useNullAsDefault: process.env.DB_USE_NULL_AS_DEFAULT === "true",
    migrations: {
      directory: "src/db/migrations",
    },
    seeds: {
      directory: "src/db/seeds",
    },
  };
}
