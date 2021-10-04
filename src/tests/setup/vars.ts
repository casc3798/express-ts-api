const database = "express_autotest";
const configNoDatabase = {
  client: "postgresql",
  connection: {
    host: process.env[`PGHOST_${process.env.NODE_ENV?.toUpperCase()}`],
    database: null,
    user: process.env[`PGUSER_${process.env.NODE_ENV?.toUpperCase()}`],
    password: process.env[`PGPASSWORD_${process.env.NODE_ENV?.toUpperCase()}`],
  },
  pool: {
    min: 0,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: `${__dirname}/../../database/migrations/${process.env.NODE_ENV}`,
  },
};
const configDatabase = {
  client: "postgresql",
  connection: {
    host: process.env[`PGHOST_${process.env.NODE_ENV?.toUpperCase()}`],
    user: process.env[`PGUSER_${process.env.NODE_ENV?.toUpperCase()}`],
    database: database,
    password: process.env[`PGPASSWORD_${process.env.NODE_ENV?.toUpperCase()}`],
  },
  pool: {
    min: 0,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: `${__dirname}/../../database/migrations/${process.env.NODE_ENV}`,
  },
};

export { database, configDatabase, configNoDatabase };
