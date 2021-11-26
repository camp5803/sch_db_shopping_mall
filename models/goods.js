'use strict';

module.exports = (sequelize, DataTypes) => {
    const Goods = sequelize.define('goods', {
        goodsuid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        issold: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        gname: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'goods',
        // sequelize,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    Goods.associate = (db) => {};
    return Goods;
};