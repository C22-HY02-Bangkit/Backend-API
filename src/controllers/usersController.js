const user = require('../models').user;
const jwt = require('jsonwebtoken');
const validator = require('validator');

// note: cuman untuk contoh - akan dihapus dikemudian hari
exports.me = (req, res) => {
    const users = await user.findAll();

    if (!users) throw new Error('users not found!');

    res.json({
        code: 200,
        status: 'success',
        data: users,
    });
};

exports.register = (req, res, next) => {
    // const { fullname, email, password, password_repeat } = req.body;

    if (!validator.isEmail(req.body.email)) {
        return res.status(400).send({
          message: "Please enter a valid email",
        });
      }
  
      // the password must be minimum 6 chars
      if (!req.body.password || req.body.password.length < 6) {
        return res.status(400).send({
          message: "Enter a password with minimum 6 chars!",
        });
      }
  
      // If the password_repeat does not match the password
      if (
        !req.body.password_repeat ||
        req.body.password != req.body.password_repeat
      ) {
        return res.status(400).send({
          msg: "Both passwords have to match!",
        });
      }
  
      next();
    
};

exports.login = (req, res, next) => {
    const { email, password } = req.body;

    res.json({
        code: 200,
        status: 'success',
        message: 'Login success',
    });
};

// exports.va;
