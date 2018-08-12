
module.exports = {
  /**
   *
   *
   * @param {any} queryInterface
   * @param {any} Sequelize
   */
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Borrows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
          as: 'userId',
        },
        allowNull: false,
      },
      bookId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Book',
          key: 'id',
          as: 'bookId',
        },
        allowNull: false,
      },
      returned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      actualReturnDate: {
        type: Sequelize.DATE,
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
    queryInterface.dropTable('Borrows');
  },
};
