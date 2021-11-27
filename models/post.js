'use strict';

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post', {
        postuid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        poster: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postcontent: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        goodsuid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        gname: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        imgpath: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'post',
        // sequelize,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    Post.associate = (db) => {};
    return Post;
};