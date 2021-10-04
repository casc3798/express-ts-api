exports.up = function (knex) {
  return knex.schema.createTable("refresh_token", function (table) {
    table.increments().primary();
    table.integer("user_id", 255).references("user.id").notNullable();
    table.string("device_id", 255).notNullable();
    table.string("refresh_token", 255).notNullable();
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("refresh_token");
};
