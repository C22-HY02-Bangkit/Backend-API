const express = require('express');
const { protect } = require('../middlewares');

const router = express.Router();
const {
    login,
    register,
    me,
    forgotPassword,
    resendEmail,
    verifyEmail,
    resetPassword,
    editProfile,
    getUsers,
    getUser,
} = require('../controllers/usersController');
const {
    registerValidate,
    loginValidate,
    verifyEmailValidate,
    forgotPasswordValidate,
    resetPasswordValidate,
    resendEmailValidate,
    EditProfileValidate,
} = require('../utils/validator/userValidate');

router.get('/', protect, getUsers);
router.get('/detail/:id', protect, getUser);
router.get('/me', protect, me);
router.put('/me', protect, EditProfileValidate, editProfile);
router.post('/login', loginValidate, login);
router.post('/register', registerValidate, register);
router.post('/resend-email', resendEmailValidate, resendEmail);
router.post('/verify-email/:token', verifyEmailValidate, verifyEmail);
router.post('/forgot-password', forgotPasswordValidate, forgotPassword);
router.post('/reset-password/:token', resetPasswordValidate, resetPassword);

module.exports = router;
