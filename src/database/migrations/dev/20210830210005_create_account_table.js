exports.up = function (knex) {
  return knex.schema.createTable("account", function (table) {
    table.increments().primary();
    table.string("name", 255).unique().notNullable();
    table.string("nit", 255);
    table.string("address", 255);
    table.string("phone", 255);
    table.string("country", 255).notNullable();
    table.string("city", 255).notNullable();
    table.string("postcode", 255);
    table.string("badge", 255).notNullable();
    table.string("service", 255).notNullable();
    table
      .string("logo", 255)
      .notNullable()
      .defaultTo(
        "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
      );
    table.string("type", 255).notNullable();
    table.integer("associate_account_id").references("account.id");
    table.timestamps(false, true);
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("account");
};
