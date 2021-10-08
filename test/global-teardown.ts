import Knex from "knex";

import knexfile from "../knexfile";

module.exports = async () => {
  const knex = Knex(knexfile.test);
  try {
    await knex.raw(`DROP DATABASE IF EXISTS distributors_test`);
    knex.destroy();
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await knex.destroy();
  }
};
