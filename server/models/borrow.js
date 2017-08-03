module.exports = (sequelize, DataTypes) => {
  const Borrow = sequelize.define('Borrow', {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    returned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  Borrow.associate = (models) => {
    Borrow.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
    });
    Borrow.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Borrow;
};
