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
    console.log(data);
    return res.render('board', { data, len, active: req.params.page });
};

const boardDetailRenderer = async (req, res) => {
    const data = await BoardModel.findOne({
        include: [{
            model: UserModel,
            attributes: ['sname']
        }, {
            model: GoodsModel,
            attributes: ['issold'],
        }],
        where: { postuid: req.params.bid },
        raw: true
    });
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
    return res.render('board-detail', { data, reply, current: req.params.bid });
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
    console.log(req.body);
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

module.exports = {
    boardRenderer,
    boardDetailRenderer,
    likeIncrement,
    addComment,
    writeRenderer,
    goodsRenderer,
    addGoods,
    addPost,
    payGoods
};