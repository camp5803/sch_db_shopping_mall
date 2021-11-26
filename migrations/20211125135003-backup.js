'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.changeColumn('users', 'password', {
    //   type: Sequelize.STRING(128),
    //   allowNull: false,
    // })
    // await queryInterface.removeColumn('post', 'gname')
    // await queryInterface.addColumn('post', 'gname', {
    //   type: Sequelize.STRING(30),
    //   allowNull: false,
    //   unique: true,
    // })
    await queryInterface.changeColumn('reply', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    })
    await queryInterface.changeColumn('post', 'likes', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
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
