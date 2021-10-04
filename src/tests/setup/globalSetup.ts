import Knex from "knex";
import * as dotenv from "dotenv";
dotenv.config({
  path: `${__dirname}/../../../.${process.env.NODE_ENV}.env`,
});
import "../../config/environment";
import { database, configNoDatabase, configDatabase } from "./vars";

process.env.RUNNING_TEST = "true";

async function createTestDatabase() {
  const knex = Knex(configNoDatabase);
  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${database}`);
    await knex.raw(`CREATE DATABASE ${database}`);
  } catch (err) {
    throw new Error(err as string);
  } finally {
    await knex.destroy();
  }
}

async function migrationsTestDatabase() {
  const knex = Knex(configDatabase);
  try {
    await knex.migrate.latest({ loadExtensions: [".js"] });
  } catch (err) {
    throw new Error(err as string);
  } finally {
    await knex.destroy();
  }
}

module.exports = async () => {
  try {
    await createTestDatabase();
    console.log("Test database created successfully");
    await migrationsTestDatabase();
    console.log("Migrations executed successfully in test database");
  } catch (err) {
    throw new Error(err as string);
  }
};

export { configNoDatabase, configDatabase };
