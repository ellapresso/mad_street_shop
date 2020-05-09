const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = require("./api");
const config = require("./config/environment");
const database = require("./config/database");
const { corsOptions } = require("./module/cors");
// create server
const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

/* CORS 처리 */
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

/**
 * 서버 종료시 후처리
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
