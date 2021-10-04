import Knex from "knex";
import { database, configNoDatabase } from "./vars";

process.env.RUNNING_TEST = "false";

module.exports = async () => {
  const knex = Knex(configNoDatabase);
  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${database}`);
    console.log("Test database dropped successfully");
    knex.destroy();
  } catch (err) {
    throw new Error(err as string);
  }
};
