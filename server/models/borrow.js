module.exports = (sequelize, DataTypes) => {
  const Borrow = sequelize.define('Borrow', {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false,
    },
  });

  Borrow.associate = (models) => {
    Borrow.belongsTo(models.Book, {
      foreignKey: 'bookId',
      as: 'book',
      onDelete: 'CASCADE',
    });
    Borrow.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Borrow;
};
