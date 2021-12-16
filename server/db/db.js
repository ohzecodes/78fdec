require("dotenv");

const { DATABASE_URL } = process.env;
const { Sequelize, DataTypes } = require("sequelize");

const db = new Sequelize(DATABASE_URL, {
  logging: false,
});

try {
  db.authenticate();
  console.log(`Connection Established to Postgres`);
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const queryInterface = db.getQueryInterface();

const f = async () => {
  const dt = await queryInterface.describeTable("messages");
  if (Object.keys(dt).includes("hasRead") != true) {
    try {
      await queryInterface.addColumn("messages", "hasRead", {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      });
    } catch (error) {
      console.log("e", error);
    }
  } else {
  }
};

f();
module.exports = db;
// DELETE FROM messages WHERE "createdAt" > '2021-12-02 07:24:56';
//
// console.log(count);
// We didn't need to destructure the result here - the results were returned directly
