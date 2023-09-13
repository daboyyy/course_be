const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "mysql",
  host: "188.166.252.193",
  username: "test",
  password: "45c0da17bd43bf681a964bc7ffd97244c11865a325c0828f",
  database: "course",
});

(async () => {
  try {
    await db.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = db;
