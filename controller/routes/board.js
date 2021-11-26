const express = require('express');
const router = express.Router();

const wrap = require('../wrap');
const boardHander = require('../boardHandler');
const authController = require('../authController');

router.use(authController.isAuth);

router.get('/board/detail/:bid', wrap(boardHander.boardDetailRenderer));
router.get('/board/:page', wrap(boardHander.boardRenderer));
router.get('/board', wrap(boardHander.boardRenderer));

router.post('/board/detail/:bid/like', wrap(boardHander.likeIncrement));
router.post('/board/detail/:bid/reply', wrap(boardHander.addComment));

module.exports = router;