const UserModel = require('../models').Users;
const BoardModel = require('../models').Post;
const ReplyModel = require('../models').Reply;
const GoodsModel = require('../models').Goods;
const { map, filter } = require('./fp');

const boardRenderer = async (req, res) => {
    if (req.params.page === undefined) {
        req.params.page = 1;
    }
    const len = Math.ceil(await BoardModel.count() / 10);
    const data = map(a => {
        a.sname = a['user.sname'];
        a.issold = a['good.issold'];
        return a;
    }, await BoardModel.findAll({
        order: [['likes', 'DESC']],
        limit: 10, offset: 10 * (req.params.page - 1),
        include: [{
            model: GoodsModel,
            attributes: ['issold'],
        }, {
            model: UserModel,
            attributes: ['sname']
        }],
        raw: true
    }));
    return res.render('board', { data, len, active: req.params.page });
};

const boardDetailRenderer = async (req, res) => {
    const data = await BoardModel.findOne({
        include: [{
            model: UserModel,
            attributes: ['sname']
        }, {
            model: GoodsModel,
            attributes: ['issold', 'type', 'price'],
        }],
        where: { postuid: req.params.bid },
        raw: true
    });
    data.type = data['good.type'];
    data.price = data['good.price'];

    switch (data.type) {
        case 'books':
            data.type = "도서"
            break;
        case 'clothes':
            data.type = "의류"
            break;
        case 'houses':
            data.type = "생활용품"
            break;
        case 'coupons':
            data.type = "기프티콘"
            break;
        case 'foods':
            data.type = "음식"
            break;
        default:
            data.type = "기타"
            break;
    }

    data.issold = data['good.issold'];
    data.sname = data['user.sname'];
    const reply = map(a => {
        a.sname = a['user.sname'];
        a.createdAt = a.createdAt.toLocaleString();
        return a;
    }, await ReplyModel.findAll({
        include: [{
            model: UserModel,
            attributes: ['sname']
        }],
        where: { postuid: req.params.bid },
        raw: true
    }));
    return res.render('board-detail', { data, reply, current: req.params.bid, uuid: req.user.uuid });
};

const likeIncrement = async (req, res) => {
    await BoardModel.increment('likes', {
        by: 1,
        where: { postuid: req.params.bid },
    });
    return res.redirect(`/board/detail/${req.params.bid}`);
};

const addComment = async (req, res) => {
    await ReplyModel.create({
        postuid: req.params.bid,
        replier: req.user.uuid,
        replycontent: req.body.content
    });
    return res.redirect(`/board/detail/${req.params.bid}`);
};

const writeRenderer = async (req, res) => {
    const data = map(a => a.toJSON(), await GoodsModel.findAll({
        where: { seller: req.user.uuid }
    }));
    return res.render('write', { data });
};

const goodsRenderer = (req, res) => {
    return res.render('goods');
};

const addGoods = async (req, res) => {
    await GoodsModel.create({
        gname: req.body.gname,
        type: req.body.type,
        price: req.body.price,
        seller: req.user.uuid,
    });
    return res.redirect('/write');
};

const addPost = async (req, res) => {
    const goods = await GoodsModel.findOne({
        where: { goodsuid: req.body.goodsuid },
        raw: true
    });
    await BoardModel.create({
        poster: req.user.uuid,
        postcontent: req.body.postcontent,
        goodsuid: req.body.goodsuid,
        gname: goods.gname,
    });
    return res.redirect('/');
};

const payGoods = async (req, res) => {
    const data = await BoardModel.findOne({
        where: { postuid: req.params.bid },
        raw: true
    });
    await GoodsModel.update({
        issold: 1
    }, { where: { goodsuid: data.goodsuid }});
    return res.redirect(`/board/detail/${req.params.bid}`);
}

const deleteReply = async (req, res) => {
    await ReplyModel.destroy({
        where: { replyuid: req.params.rid },
    });
    return res.redirect(`/board/detail/${req.params.bid}`);
}

const deletePost = async (req, res) => {
    await BoardModel.destroy({
        where: { postuid: req.params.bid },
    });
    return res.redirect('/');
}

const deleteGoods = async (req, res) => {
    await GoodsModel.destroy({
        where: { goodsuid: req.params.gid },
    });
    return res.redirect('/write');
}

module.exports = {
    boardRenderer,
    boardDetailRenderer,
    likeIncrement,
    addComment,
    writeRenderer,
    goodsRenderer,
    addGoods,
    addPost,
    payGoods,
    deleteReply,
    deletePost,
    deleteGoods,
};