export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: /^[a-z0-9\_\-]+$/i,
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
      validate: {
        isEmail: true,
      },
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
  });

  User.associate = (models) => {
    User.hasMany(models.Borrow, {
      foreignKey: 'userId',
      as: 'borrow',
    });
  };
  return User;
};

