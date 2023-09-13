"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.userId = this.belongsTo(models.Authentication, {
        foreignKey: "user_id",
      });
    }
  }
  RefreshToken.init(
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: "user_id",
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "RefreshToken",
      tableName: "refresh_token",
      freezeTableName: true,
    }
  );
  return RefreshToken;
};
