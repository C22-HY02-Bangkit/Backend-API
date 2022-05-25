const express = require('express');

const router = express.Router();
const {
    login,
    register,
    me,
    forgotPassword,
    resendEmail,
    verifyEmail,
} = require('../controllers/usersController');
const {
    registerValidate,
    loginValidate,
    verifyEmailValidate,
    forgotPasswordValidate,
    resetPasswordValidate,
    resendEmailValidate,
} = require('../utils/validator/userValidate');

router.get('/me', me);
router.post('/login', loginValidate, login);
router.post('/register', registerValidate, register);
router.post('/resend-email', resendEmailValidate, resendEmail);
router.post('/verify-email/:token', verifyEmailValidate, verifyEmail);
router.post('/forgot-password', forgotPasswordValidate, forgotPassword);
router.post('/reset-password/:token', resetPasswordValidate);

module.exports = router;
