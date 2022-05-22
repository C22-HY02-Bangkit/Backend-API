const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const db = require('../config/config.js');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const router = express.Router();
const controller = require('../controllers/usersController.js');
const { login, register, me } = require('../controllers/usersController');

router.get('/me', me);
router.post('/login', login);
router.post('/register', controller.register, (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
            req.body.email
        )});`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    message: 'This email is already used by other!',
                });
            } else {
                // If the email is available
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            message: err,
                        });
                    } else {
                        // has hashed password => add to the database
                        db.query(
                            `INSERT INTO users (id, email, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
                                req.body.email
                            )}, ${db.escape(hash)}, now())`,
                            (err, result) => {
                                if (err) {
                                    throw err;
                                    return res.status(400).send({
                                        message: err,
                                    });
                                }
                                return res.status(201).send({
                                    message: 'Successfully registered!',
                                });
                            }
                        );
                    }
                });
            }
        }
    );
});

module.exports = router;
