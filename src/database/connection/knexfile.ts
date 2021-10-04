import * as dotenv from "dotenv";
import { database } from "../../tests/setup/vars";
dotenv.config({ path: `${__dirname}/../../../.${process.env.NODE_ENV}.env` });

const knexConfig = {
  dev: {
    client: "postgresql",
    connection: {
      host: process.env.PGHOST_DEV,
      database: process.env.PGDATABASE_DEV,
      user: process.env.PGUSER_DEV,
      password: process.env.PGPASSWORD_DEV,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "../migrations/dev",
    },
  },
  autotest: {
    client: "postgresql",
    connection: {
      host: process.env[`PGHOST_${process.env.NODE_ENV?.toUpperCase()}`],
      user: process.env[`PGUSER_${process.env.NODE_ENV?.toUpperCase()}`],
      database: database,
      password:
        process.env[`PGPASSWORD_${process.env.NODE_ENV?.toUpperCase()}`],
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `../migrations/${process.env.NODE_ENV}`,
    },
  },
  test: {
    client: "postgresql",
    connection: {
      host: process.env.PGHOST_TEST,
      database: process.env.PGDATABASE_TEST,
      user: process.env.PGUSER_TEST,
      password: process.env.PGPASSWORD_TEST,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "../migrations/test",
    },
  },
  prod: {
    client: "postgresql",
    connection: {
      host: process.env.PGHOST_PROD,
      database: process.env.PGDATABASE_PROD,
      user: process.env.PGUSER_PROD,
      password: process.env.PGPASSWORD_PROD,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "../migrations/prod",
    },
  },
};
export default knexConfig;
module.exports = knexConfig;
