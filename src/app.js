const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const { Sequelize } = require('sequelize');
const ErrorHandler = require('./utils/errorHandler');

require('dotenv').config();
require('express-async-errors');

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(xss());

// connect database
const db = new Sequelize(
    process.env.DBNAME,
    process.env.DBUSER,
    process.env.DBPASSWORD,
    {
        host: process.env.DBHOST,
        dialect: 'postgres',
    }
);

db.authenticate()
    .then(() => {
        console.log('database connected');
        app.listen(port, () =>
            console.log(`Server run on http://${host}:${port}/`)
        );
    })
    .catch((error) => {
        console.log('Database Error: ', error);
    });

// routes
const router = require('./routes/users.js');
app.use('/api', router);

// 404 endpoint
app.all('*', (req, res) => {
    res.status(404).json({ message: `${req.originalUrl} not found!` });
});

// error handler
app.use(ErrorHandler);
