require('dotenv').config()

module.exports = {
    development: {
        username: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME,
        host: process.env.DBHOST,
        dialect: 'postgresql',
    },
    test: {
        username: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME,
        host: process.env.DBHOST,
        dialect: 'postgresql',
    },
    production: {
        username: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME,
        host: process.env.DBHOST,
        dialect: 'postgresql',
        ssl: true,
    },
};
