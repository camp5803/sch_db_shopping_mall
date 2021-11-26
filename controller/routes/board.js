const express = require('express');
const router = express.Router();

const wrap = require('../wrap');
const boardHander = require('../boardHandler');
const authController = require('../authController');

router.use(authController.isAuth);

router.get('/board/detail/:bid', wrap(boardHander.boardDetailRenderer));
router.get('/board/:page', wrap(boardHander.boardRenderer));
router.get('/board', wrap(boardHander.boardRenderer));
router.get('/write', boardHander.writeRenderer);
router.get('/goods', boardHander.goodsRenderer);
router.get('/board/detail/:bid/like', wrap(boardHander.likeIncrement));
router.get('/board/detail/:bid/reply/delete/:rid', wrap(boardHander.deleteReply));
router.get('/board/detail/delete/:bid', wrap(boardHander.deletePost));
router.get('/goods/delete/:gid', wrap(boardHander.deleteGoods));

router.post('/board/detail/:bid/reply', wrap(boardHander.addComment));
router.post('/board/detail/:bid/payment', boardHander.payGoods)
router.post('/write', wrap(boardHander.addPost));
router.post('/goods', wrap(boardHander.addGoods));

module.exports = router;