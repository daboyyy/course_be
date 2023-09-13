"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CustomerInfo extends Model {
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
  CustomerInfo.init(
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: "user_id",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        field: "first_name",
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        field: "last_name",
        allowNull: true,
      },
      nickname: {
        type: DataTypes.STRING,
        field: "nickname",
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        field: "gender",
        allowNull: true,
      },
      birthDate: {
        type: DataTypes.DATE,
        field: "birth_date",
        allowNull: true,
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
      modelName: "CustomerInfo",
      tableName: "customer_info",
      freezeTableName: true,
    }
  );
  return CustomerInfo;
};
