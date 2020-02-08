const dotenv = require("dotenv");
const path = require("path");
const _ = require("lodash");

/* istanbul ignore next */
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

/* istanbul ignore next */
const config = {
  env: process.env.NODE_ENV || "development",
  root: path.normalize(`${__dirname}/../../..`),
  tz: process.env.TZ || "Asia/Seoul",
  ip: process.env.IP || "0.0.0.0",
  port: process.env.PORT || "3000",
  database: {
    mongoosedb: {
      dialect: process.env.SSS_DATABASE_TYPE || "",
      host: process.env.SSS_DATABASE_HOST || "",
      port: process.env.SSS_DATABASE_PORT || "",
      username: process.env.SSS_DATABASE_USERNAME || "",
      password: process.env.SSS_DATABASE_PASSWORD || "",
      schema: process.env.SSS_DATABASE_SCHEMA || "",
      dbname: process.env.SSS_DATABASE_DBNAME || "",
      path: process.env.SSS_DATABASE_PATH || ""
    }
  }
};

module.exports = config;
