import { Knex } from "knex";
import { Distributors } from "../../src/models/distributors"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.hasTable('channel-authorizations').then(function(exists) {
        if (!exists) {
          return knex.schema.createTable('channel-authorizations', function(t) {
            t.increments('id').notNullable().primary();
            t.string('name', 50).notNullable();
            t.string('code', 50).notNullable();
            t.integer('idDistributor').notNullable();
            t.foreign('idDistributor').references('id').inTable(Distributors.tableName).onDelete("CASCADE");
          });
        }
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.hasTable('channel-authorizations').then(function(exists) {
        if (exists) {
          return knex.schema.dropTable('channel-authorizations');
        }
      });
}

