require('dotenv').config();
require('express-async-errors');

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const sql = require('./config/db');
const ErrorHandler = require('./utils/errorHandler');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

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

// realtime server
io.on('connection', (socket) => {
    sql.listen('new_data', (payload) => {
        const data = JSON.parse(payload);
        io.emit('realtime', data.new);
    });
});

// 404 endpoint
app.all('*', (req, res) => {
    res.status(404).json({ message: `${req.originalUrl} not found!` });
});

// error handler
app.use(ErrorHandler);

app.listen(port, () => console.log(`Server run on http://${host}:${port}/`));
