exports.up = function (knex) {
  return knex.schema.createTable("user", function (table) {
    table.increments().primary();
    table.string("firstname", 255).notNullable();
    table.string("lastname", 255).notNullable();
    table.string("nickname", 255).unique().notNullable();
    table.string("email", 255).unique().notNullable();
    table.string("phone", 255).notNullable();
    table.string("country", 255).notNullable();
    table.string("city", 255).notNullable();
    table.string("language", 255).notNullable();
    table.string("time_zone", 255).notNullable();
    table.string("image", 255).notNullable();
    table.string("password", 255).notNullable();
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
