export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: DataTypes.STRING,
  });
  Category.associate = (models) => {
    Category.hasMany(models.Book, {
      foreignKey: 'categoryId',
      as: 'cat'
    });
  };
  return Category;
};
