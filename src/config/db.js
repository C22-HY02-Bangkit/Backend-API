require('dotenv').config();
const postgres = require('postgres');

const host = process.env.DBHOST;
const port = process.env.DBPORT;
const database = process.env.DBNAME;
const username = process.env.DBUSER;
const password = process.env.DBPASSWORD;
const env = process.env.NODE_ENV || 'development';

const sql =
    env === 'development'
        ? postgres({
              host,
              port,
              database,
              username,
              password,
          })
        : postgres(process.env.DATABASE_URL, {
              ssl: { rejectUnauthorized: false },
          });

module.exports = sql;
