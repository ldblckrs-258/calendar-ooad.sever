"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reminder extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.Apm, {
        foreignKey: "appointmentId",
        onDelete: "CASCADE",
      });
    }
  }
  Reminder.init(
    {
      appointmentId: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Reminder",
    }
  );
  return Reminder;
};
