import Knex from "knex";

import knexfile from "../knexfile";
import {config} from "../src/config"
// Create the database
async function createTestDatabase() {

  let knex=Knex(knexfile.test);  
  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${config.dbTestName}`);
    await knex.raw(`CREATE DATABASE ${config.dbTestName}`);
    await knex.destroy();
  } catch (error) {
    console.log(''+error)
    throw new Error("" + error);
  } finally {
    await knex.destroy();
  }
}



module.exports = async () => {
  try {

    await createTestDatabase();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
