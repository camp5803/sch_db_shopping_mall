'use strict';

module.exports = (sequelize, DataTypes) => {
    const Reply = sequelize.define('reply', {
        replyuid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        postuid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        replier: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        replycontent: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        }
    }, {
        tableName: 'reply',
        // sequelize,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    Reply.associate = (db) => {};
    return Reply;
};