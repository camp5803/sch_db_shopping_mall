const UserModel = require('../models').Users;
const BoardModel = require('../models').Post;
const GoodsModel = require('../models').Goods;
const { map, filter } = require('./fp');

const defaultRenderer = (req, res) => {
    return res.redirect('/types/all');
}

const typesRenderer = async (req, res) => {
    const types = ['books', 'clothes', 'houses', 'coupons', 'foods', 'all', 'techs'];
    req.params.type = types.includes(req.params.type) ? req.params.type : 'etc';
    if (req.params.page === undefined) {
        req.params.page = 1;
    }
    if (req.params.type === 'all') {
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
        const len = Math.ceil(await BoardModel.count() / 10);
        return res.render('search', { data, len, active: req.params.page, type: req.params.type });
    } else {
        const data = map(a => {
            a.sname = a['user.sname'];
            a.issold = a['good.issold'];
            return a;
        }, await BoardModel.findAll({
            order: [['likes', 'DESC']],
            limit: 10, offset: 10 * (req.params.page - 1),
            include: [{
                model: GoodsModel,
                attributes: ['type', 'issold'],
                where: { type: req.params.type }
            }, {
                model: UserModel,
                attributes: ['sname']
            }],
            raw: true
        }));
        console.log(data);
        const len = Math.ceil(await BoardModel.count({
            include: [{
                model: GoodsModel,
                where: { type: req.params.type }
            }],
        }) / 10);
        return res.render('search', { data, len, active: req.params.page, type: req.params.type });
    }
}

module.exports = {
    defaultRenderer,
    typesRenderer,
}