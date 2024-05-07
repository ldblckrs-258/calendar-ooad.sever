"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GMP extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.Apm, {
        foreignKey: "apmId",
        onDelete: "CASCADE",
      });
    }
  }
  GMP.init(
    {
      apmId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "GMP",
    }
  );
  return GMP;
};
