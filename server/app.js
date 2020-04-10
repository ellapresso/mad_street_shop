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

// body-parser, post 요청시 body 데이터 추출 하기 위함
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors({ origin: [/localhost/] }));
const acceptList = [
  /mad-street-shop\.now\.sh/,
  /localhost/,
  /mad-street-shop\.kimhaein\.now\.sh/,
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
app.use(cors(corsOptions));

// 라우트 설정
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
    // database.mongooseDb.close();
    process.exit(0);
  });
});

server.listen(config.port, () => {
  console.info("[APP]", `listening on port ${config.port}.`);
});

module.exports = server;
