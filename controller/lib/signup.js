const regx = require('../regex');
const UserModel = require('../../models').Users;

const confirmData = async (data) => {
    const stat = [];
    confirmPw(data);
    stat[0] = await confirmId(data);

    if (!regx.regexValidater(data.stuno, 'stuno')) {
        if (stat[0] == null) {
            stat[0] = '올바르지 않은 아이디입니다.';
        } else {
            stat[0] += '\n 올바르지 않은 아이디입니다.';
        }
    }

    return stat;
};

const confirmPw = (data) => {
    if (data.password !== data.password2) {
        console.error('비밀번호가 일치하지 않습니다.');
    } else {
        delete data.password2;
    }
};

const confirmId = async (data) => {
    const result = await UserModel.findOne({ where: { stuno: data.stuno }});
    if (result) {
        return '이미 가입된 회원입니다.';
    } else {
        return null;
    }
};

module.exports = confirmData;