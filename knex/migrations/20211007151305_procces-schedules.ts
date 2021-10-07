import { Knex } from "knex";
import { Distributors } from "../../src/models/distributors"


export async function up(knex: Knex): Promise<void> {
    return knex.schema.hasTable('process-schedules').then(function(exists) {
        if (!exists) {
          return knex.schema.createTable('process-schedules', function(t) {
            t.increments('id').notNullable().primary();
            t.time('startTime').notNullable();
            t.time('finishTime').notNullable();
            t.integer('idDistributor').notNullable();
            t.foreign('idDistributor').references('id').inTable(Distributors.tableName).onDelete("CASCADE");
          });
        }
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.hasTable('process-schedules').then(function(exists) {
        if (exists) {
          return knex.schema.dropTable('process-schedules');
        }
      });
}

