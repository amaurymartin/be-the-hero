exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments();

    table.integer('ngo_id').notNullable();
    table.foreign('ngo_id').references('id').inTable('ngos');

    table.string('key').notNullable();
    table.string('name').notNullable();
    table.string('nickname').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();

    table.unique('key');
    table.unique('email');

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
