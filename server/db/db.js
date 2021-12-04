require("dotenv");
const Sequelize = require("sequelize");
const { dbname, dbuser, dbpass, dbhost, dbport } = process.env;
const db = new Sequelize({
  database: dbname,
  username: dbuser,
  password: dbpass,
  host: dbhost,
  port: dbport,
  dialect: "postgres",
  logging: false,
});

try {
  db.authenticate();
  console.log(`Connection Established to Postgres`);
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = db;
