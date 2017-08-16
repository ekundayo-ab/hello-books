module.exports = {
  /**
   *
   *
   * @param {any} queryInterface
   * @param {any} Sequelize
   */
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[a-z0-9_-]+$/i,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        isEmail: true,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'normal',
        allowNull: false,
      },
      level: {
        type: Sequelize.STRING,
        defaultValue: 'bronze',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  /**
   *
   *
   * @param {any} queryInterface
   */
  down: (queryInterface /* , Sequelize */) => {
    queryInterface.dropTable('Users');
  },
};
