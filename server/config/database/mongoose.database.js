const config = require("../environment");
const mongoose = require("mongoose");
const env = config.database.mongoosedb;

const mongooseDb = () => {
  function connect() {
    mongoose
      .connect(
        `${env.dialect}://${env.username}:${env.password}@${env.host}:${env.port}/${env.dbname}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
        }
      )
      .catch(err => {
        console.error("[DATABASE] mongoDB Connection Error");
        console.error(err);
      })
      .then(console.log("[DATABASE] mongoDB Connection Success"));
  }
  connect();
  mongoose.connection.on("[DATABASE] mongoDB Connection disconnected", connect);
};

module.exports = mongooseDb;
