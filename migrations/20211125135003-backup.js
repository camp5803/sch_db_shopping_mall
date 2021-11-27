'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.changeColumn('users', 'password', {
    //   type: Sequelize.STRING(128),
    //   allowNull: false,
    // })
    // await queryInterface.removeColumn('post', 'gname')
    // await queryInterface.changeColumn('goods', 'gname', {
    //   type: Sequelize.STRING(30),
    //   allowNull: false,
    //   unique: true,
    // })
    // await queryInterface.changeColumn('reply', 'createdAt', {
    //   type: Sequelize.DATE,
    //   allowNull: true,
    //   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    // })
    // await queryInterface.changeColumn('post', 'views', {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   defaultValue: 0
    // })
    // await queryInterface.addColumn('goods', 'seller', {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // })
    // await queryInterface.changeColumn('post', 'imgpath', {
    //   type: Sequelize.STRING(100),
    //   allowNull: false,
    //   defaultValue: 0
    // })
    await queryInterface.addColumn('goods', 'isposted', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
