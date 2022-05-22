const express = require('express');
const app = express();
const router = express.Router();
const { login, register, me } = require('../controllers/usersController');

router.get('/me', me);
router.post('/login', login);
router.post('/register', register);

module.exports = router;
