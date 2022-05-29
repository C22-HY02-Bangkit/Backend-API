require('dotenv').config();
const postgres = require('postgres');

const host = process.env.DBHOST;
const port = process.env.DBPORT;
const database = process.env.DBNAME;
const username = process.env.DBUSER;
const password = process.env.DBPASSWORD;

const sql =
    process.env.ENV_MODE === 'prod'
        ? postgres(process.env.DATABASE_URL, {
              ssl: { rejectUnauthorized: false },
          })
        : postgres({
              host,
              port,
              database,
              username,
              password,
          });

module.exports = sql;
