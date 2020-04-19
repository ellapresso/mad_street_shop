const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = require("./api");
const config = require("./config/environment");
const database = require("./config/database");

// create server
const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const acceptList = [
  "https://localhost:3000",
  "http://localhost:3000",
  "https://localhost:9876",
  "https://mad-street-shop.kimhaein.now.sh",
  "https://mad-street-shop.now.sh",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (acceptList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
// app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

api.route(app);

// use database
database();

/**
 * 처리하지 못한 예외 로그 기록
 */
process.on("uncaughtException", (err) => {
  console.error("UncaughtException", `[${err.name}] ${err.message}`);
  console.error("UncaughtException", err.stack);
});

/**
 * 서버 종료시 후처리
 *  - 소켓서버 종료
 *  - 실시간 서버 연결 종료
 *  - 데이터베이스 커넥션 종료
 */
process.on("SIGINT", () => {
  server.close(() => {
    console.info("APP", "close.");
    database.mongooseDb.close();
    process.exit(0);
  });
});

server.listen(config.port, () => {
  console.info("[APP]", `listening on port ${config.port}.`);
});

module.exports = server;
