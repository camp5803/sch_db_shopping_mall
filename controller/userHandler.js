const passport = require('passport');
const BoardModel = require('../models').Post;
const GoodsModel = require('../models').Goods;
const UserModel = require('../models').Users;
const crypto = require('crypto');
const confirmData = require('./lib/signup');
const { map, filter } = require('./fp');

const loginRenderer = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/board');
    } else {
        return res.render('play', { err: false });
    }
};

const signupRenderer = (req, res) => {
    if (req.isAuthenticated()) {
        return res.render('board', { route: "/" });
    } else {
        return res.render('join', { err: [null, null] });
    }
};

const loginHandler = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res.render('play', {err});
        }
        if (user) {
            req.login(user, loginErr => {
                if (loginErr) {
                    res.render('play', { err: loginErr });
                }
                res.redirect('board');
            });
        } else {
            res.render('play', { err: info.message });
        }
    })(req, res, next);
};

const signupHandler = async (req, res, next) => {
    const errCheck = await confirmData(req.body);
    const cipher = crypto.createHash('sha512').update(req.body.password).digest('hex');

    if (errCheck[0] || errCheck[1]) {
        return res.render('join', { err: errCheck });
    }

    await UserModel.create({
        stuno: req.body.stuno,
        sname: req.body.sname,
        dept: req.body.dept,
        telno: req.body.telno,
        address: req.body.address,
        password: cipher,
    });

    return res.redirect('/');
}

const logoutHandler = (req, res) => {
    req.logout();
    return res.redirect('/');
}

const profileRenderer = async (req, res) => {
    const data = map(a => {
        a.sname = a['user.sname']
        return a;
    }, await BoardModel.findAll({
        order: [['likes', 'DESC']],
        include: [{
            model: UserModel,
            attributes: ['sname']
        }],
        raw: true
    }));
    return res.render('profile', { data });
}

module.exports = {
    loginRenderer,
    signupRenderer,
    loginHandler,
    signupHandler,
    logoutHandler,
    profileRenderer,
};