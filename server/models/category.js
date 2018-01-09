export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Category already exists'
      },
    }
  });
  Category.associate = (models) => {
    Category.hasMany(models.Book, {
      foreignKey: 'categoryId',
      as: 'cat'
    });
  };
  return Category;
};
