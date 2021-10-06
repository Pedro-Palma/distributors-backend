import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.hasTable('distributors').then(function(exists) {
        if (!exists) {
          return knex.schema.createTable('distributors', function(t) {
            t.increments('id').notNullable().primary();
            t.string('name', 50).notNullable();
            t.string('code', 50).notNullable();
            t.string('emailNotification', 50).notNullable();
            t.string('emailAlert', 50).notNullable();
          });
        }
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.hasTable('distributors').then(function(exists) {
        if (exists) {
          return knex.schema.dropTable('distributors');
        }
      });
}

