export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: /^[a-z0-9_-]+$/i,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'normal',
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      defaultValue: 'bronze',
    },
    borrowLimit: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
    totalBorrow: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Borrow, {
      foreignKey: 'userId',
      as: 'borrow',
    });
  };
  return User;
};
