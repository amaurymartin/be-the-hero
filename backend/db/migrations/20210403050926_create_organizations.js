/* eslint-disable */

exports.up = function(knex) {
  return knex.schema.createTable('organizations', function(table) {
    table.increments();

    table.string('key').notNullable();
    table.string('name').notNullable();
    table.string('nickname').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('country').notNullable().defaultTo('BRA');

    table.unique('key');
    table.unique('email');
    table.unique('whatsapp');

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('organizations');
};
