import Knex from "knex";
import {config} from "../src/config"

import knexfile from "../knexfile";

module.exports = async () => {
  const knex = Knex(knexfile.test);
  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${config.dbTestName}`);
    knex.destroy();
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await knex.destroy();
  }
};
