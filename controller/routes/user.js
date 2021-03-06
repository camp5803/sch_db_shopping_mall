const express = require('express');
const router = express.Router();

const wrap = require('../wrap');
const userHandler = require('../userHandler');
const authController = require('../authController');

router.get('/', wrap(userHandler.loginRenderer));
router.get('/join', wrap(userHandler.signupRenderer));
router.get('/logout', userHandler.logoutHandler);
router.get('/profile', authController.isAuth, wrap(userHandler.profileRenderer));

router.post('/', wrap(userHandler.loginHandler));
router.post('/join', wrap(userHandler.signupHandler));

module.exports = router;