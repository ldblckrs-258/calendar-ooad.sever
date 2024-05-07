"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Reminder, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });

      this.hasMany(models.GMP, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });

      this.hasMany(models.Apm, {
        foreignKey: "ownerId",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
