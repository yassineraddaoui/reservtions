const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/auth/signup', userCtrl.signup);
router.post('/auth/login', userCtrl.login);

router.get('/signup', userCtrl.signupForm);
router.get('/signin', userCtrl.loginForm);

module.exports = router;
