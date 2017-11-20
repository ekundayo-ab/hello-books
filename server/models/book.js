export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    isbn: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Book.associate = (models) => {
    Book.hasMany(models.Borrow, {
      foreignKey: 'bookId',
      as: 'book',
    });
    Book.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'cat',
    });
  };
  return Book;
};
