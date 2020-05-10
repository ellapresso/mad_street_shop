const config = require("../environment");
const mongoose = require("mongoose");
const env = config.database.mongoosedb;
const { logger } = require("../../module/logger");

const mongooseDb = () => {
  function connect() {
    mongoose
      .connect(
        `${env.dialect}://${env.username}:${env.password}@${env.host}:${env.port}/${env.dbname}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        }
      )
      .catch((err) => {
        logger.error("[DATABASE] mongoDB Connection Error");
        logger.error(err);
      })
      .then(logger.log("[DATABASE] mongoDB Connection Success"));
  }
  connect();
  mongoose.connection.on("[DATABASE] mongoDB Connection disconnected", connect);
};

module.exports = mongooseDb;
