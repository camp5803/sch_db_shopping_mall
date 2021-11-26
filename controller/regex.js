const regexValidater = (data, type) => {
    const idValidater = /[0-9]{8}/g;

    if (type == 'stuno') {
        data = idValidater.exec(data);
        if (data == null) {
            return false;
        } else {
            return true;
        }
    } else {
        console.error(`TypeError: 알 수 없는 타입 또는 undefined: ${type}`);
        return false;
    }
}

module.exports = {
    regexValidater,
}