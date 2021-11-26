'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};


const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Users = require('./users')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Reply = require('./reply')(sequelize, Sequelize);
db.Goods = require('./goods')(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users.hasMany(db.Reply, { foreignKey: 'replier', sourceKey: 'uuid' });
db.Users.hasMany(db.Post, { foreignKey: 'poster', sourceKey: 'uuid' });
db.Goods.hasOne(db.Post, { foreignKey: 'gname', sourceKey: 'gname'});
db.Goods.hasOne(db.Post, { foreignKey: 'goodsuid', sourceKey: 'goodsuid'});
db.Post.hasMany(db.Reply, { foreignKey: 'postuid', sourceKey: 'postuid' });
db.Reply.belongsTo(db.Users, { foreignKey: 'replier', sourceKey: 'uuid' });
db.Post.belongsTo(db.Users, { foreignKey: 'poster', sourceKey: 'uuid' });
db.Post.belongsTo(db.Goods, { foreignKey: 'gname', sourceKey: 'gname'});
db.Post.belongsTo(db.Goods, { foreignKey: 'goodsuid', sourceKey: 'goodsuid'});
db.Reply.belongsTo(db.Post, { foreignKey: 'postuid', sourceKey: 'postuid' });

module.exports = db;
