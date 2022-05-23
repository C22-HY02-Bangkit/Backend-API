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

// routes
app.use('/api', require('./routes'));

// 404 endpoint
app.all('*', (req, res) => {
    res.status(404).json({ message: `${req.originalUrl} not found!` });
});

// error handler
app.use(ErrorHandler);

app.listen(port, () => console.log(`Server run on http://${host}:${port}/`));
