"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        field: "role_id",
        allowNull: false,
        primaryKey: true,
      },
      roleName: {
        type: DataTypes.STRING,
        field: "role_name",
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
      modelName: "Role",
      tableName: "role",
      freezeTableName: true,
    }
  );
  return Role;
};
