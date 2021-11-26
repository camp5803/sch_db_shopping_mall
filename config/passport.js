const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models').Users;
const crypto = require('crypto');

module.exports = () => {
    passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
        done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
    });

    passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
        done(null, user); // 여기의 user가 req.user가 됨
    });

    passport.use(new LocalStrategy({
        usernameField: 'stuno',
        passwordField: 'password',
        session: true
    }, async (stuno, password, done) => {
        const cipher = crypto.createHash('sha512').update(password).digest('hex');
        const user = await UserModel.findOne({ where: { stuno, password: cipher }});
        if (!user) {
            done(null, false, { message: "학번 또는 비밀번호를 다시 확인해주세요." });
        } else {
            if (cipher === user.password) {
                // res.locals.isAuthenticated = req.isAuthenticated;
                done(null, user);
            } else {
                done(null, false, { message: "학번 또는 비밀번호를 다시 확인해주세요." });
            }
        }
    }))
};