import * as path from 'path';


const development = {
  
  client: 'postgresql',
  useNullAsDefault: true,
  connection: {
    database: 'Distributors',
    user:     'postgres',
    password: 'root'
  },
  pool: {
    min: 0,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve('./knex/migrations'),
    extension: '.ts',
    loadExtensions: ['.ts'],
  },
  
}

const test = {
  
  client: 'postgresql',
  useNullAsDefault: true,
  connection: {
    host:'127.0.0.1',
    user:     'postgres',
    password: 'root'
  },
  pool: {
    min: 0,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve('./knex/migrations'),
    extension: '.ts',
    loadExtensions: ['.ts'],
  },
  
}

export default {
  test, 
  development, 
}