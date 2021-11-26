const express = require('express');
const router = express.Router();

const wrap = require('../wrap');
const authController = require('../authController');
const searchHandler = require('../searchHandler');

router.use(authController.isAuth);

router.get('/types', searchHandler.defaultRenderer);
router.get('/types/:type', searchHandler.typesRenderer);
router.get('/types/:type/:page', searchHandler.typesRenderer);

module.exports = router;