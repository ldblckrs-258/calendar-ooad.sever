"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Apm extends Model {
    static associate(models) {
      this.hasMany(models.Reminder, {
        onDelete: "CASCADE",
        foreignKey: "appointmentId",
      });
      this.hasMany(models.GMP, {
        onDelete: "CASCADE",
        foreignKey: "apmId",
      });
    }
  }
  Apm.init(
    {
      ownerId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      location: DataTypes.STRING,
      date: DataTypes.DATE,
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
      isGroup: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Apm",
    }
  );
  return Apm;
};
