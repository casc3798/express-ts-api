import knexConfig from "./knexfile";
import { knex } from "knex";

type key = "dev" | "prod" | "test" | "autotest";
const knexEnv: key =
  process.env.RUNNING_TEST === "true"
    ? "autotest"
    : (process.env.NODE_ENV as key);
const config: any = knexConfig[knexEnv];
const knexInstance = knex(config);

export { knexInstance };
