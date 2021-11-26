const UserModel = require('../models').Users;
const BoardModel = require('../models').Post;
const ReplyModel = require('../models').Reply;
const { map, filter } = require('./fp');

const boardRenderer = async (req, res) => {
    if (req.params.page === undefined) {
        req.params.page = 1;
    }
    const len = Math.ceil(await BoardModel.count() / 10);
    const data = map(a => a.toJSON(), await BoardModel.findAll({
        order: [['likes', 'DESC']],
        limit: 10, offset: 10 * (req.params.page - 1)
    }));
    return res.render('board', {data, len, active: req.params.page});
};

const boardDetailRenderer = async (req, res) => {
    const data = await BoardModel.findOne({
        include: [{
            model: UserModel,
            attributes: ['sname']
        }],
        where: {postuid: req.params.bid},
        raw: true
    });
    data.sname = data['user.sname'];
    const reply = map(a => {
        a.sname = a['user.sname']
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

module.exports = {
    boardRenderer,
    boardDetailRenderer,
    likeIncrement,
    addComment,
};