exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table) {
    table.increments();

    table.integer('ngo_id').notNullable();
    table.foreign('ngo_id').references('id').inTable('ngos');

    table.string('key').notNullable();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable().defaultTo(0);

    table.unique('key');

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
