"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("role", {
      role_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.SMALLINT,
      },
      role_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("authentication", {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password_hash: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      role_id: {
        allowNull: false,
        type: Sequelize.SMALLINT,
        references: {
          model: "role",
          key: "role_id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addIndex("authentication", ["user_id"]);
    await queryInterface.addIndex("authentication", ["email"]);

    await queryInterface.createTable("customer_info", {
      user_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "authentication",
          key: "user_id",
        },
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "authentication",
          key: "email",
        },
      },
      first_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      last_name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      nickname: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      gender: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      birth_date: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addIndex("customer_info", ["user_id"]);

    await queryInterface.createTable("refresh_token", {
      user_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "authentication",
          key: "user_id",
        },
      },
      token: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addIndex("refresh_token", ["user_id"]);
    await queryInterface.addIndex("refresh_token", ["token"]);

    await queryInterface.createTable("course", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "authentication",
          key: "user_id",
        },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image_url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      subject: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      enrolled: {
        defaultValue: 0,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      started_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      ended_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addIndex("course", ["user_id"]);
    await queryInterface.addIndex("course", ["title"]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("course");
    await queryInterface.dropTable("customer_info");
    await queryInterface.dropTable("refresh_token");
    await queryInterface.dropTable("authentication");
    await queryInterface.dropTable("role");
  },
};
