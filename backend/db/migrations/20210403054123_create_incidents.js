/* eslint-disable */

exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table) {
    table.increments();

    table.integer('organization_id').notNullable();
    table.foreign('organization_id').references('id').inTable('organizations');

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
