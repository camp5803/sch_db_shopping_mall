'use strict';

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        uuid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        stuno: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sname: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        password : {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        dept: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        telno: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        tableName: 'users',
        // sequelize,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    Users.associate = (db) => {};
    return Users;
};