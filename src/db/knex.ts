
import Knex from 'knex';


import knexfile from '../../knexfile';



const env = process.env.ENV || 'development';
// @ts-ignore
const conf:any = knexfile[env]

export default Knex(conf)


