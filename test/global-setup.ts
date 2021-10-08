import Knex from "knex";

import knexfile from "../knexfile";

const database = "distributors_test";

// Create the database
async function createTestDatabase() {
  let knex=Knex(knexfile.test);  
  try {
    await knex.raw(`DROP DATABASE IF EXISTS distributors_test`);
    await knex.raw(`CREATE DATABASE distributors_test`);
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
    console.log('pasa por aqui')
    await createTestDatabase();
    console.log('por aqui tambien')
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
