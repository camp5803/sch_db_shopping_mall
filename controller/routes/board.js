const express = require('express');
const router = express.Router();
const multer = require('multer');

const wrap = require('../wrap');
// const upload = multer({ dest: "img/" });
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'views/img/');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }),
});
const boardHander = require('../boardHandler');
const authController = require('../authController');

router.use(authController.isAuth);

router.get('/board/detail/:bid', wrap(boardHander.boardDetailRenderer));
router.get('/board/:page', wrap(boardHander.boardRenderer));
router.get('/board', wrap(boardHander.boardRenderer));
router.get('/write', wrap(boardHander.writeRenderer));
router.get('/goods', boardHander.goodsRenderer);
router.get('/board/detail/:bid/like', wrap(boardHander.likeIncrement));
router.get('/board/detail/:bid/exchange', wrap(boardHander.exchangeRenderer));
router.get('/board/detail/:bid/reply/delete/:rid', wrap(boardHander.deleteReply));
router.get('/board/detail/delete/:bid', wrap(boardHander.deletePost));
router.get('/board/detail/modify/:bid', wrap(boardHander.modifyPostRenderer));
router.get('/goods/modify/:gid', wrap(boardHander.modifyRenderer));
router.get('/goods/delete/:gid', wrap(boardHander.deleteGoods));

router.post('/board/detail/:bid/reply', wrap(boardHander.addComment));
router.post('/board/detail/:bid/payment', wrap(boardHander.payGoods));
router.post('/goods/modify/:gid', boardHander.modifyHandler);
router.post('/board/detail/:bid/exchange', wrap(boardHander.exchangeHandler));
router.post('/board/detail/modify/:bid', wrap(boardHander.modifyPostHandler));
router.post('/write', upload.single('img'), wrap(boardHander.addPost));
router.post('/goods', wrap(boardHander.addGoods));

module.exports = router;