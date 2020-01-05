const http = require("http");
const express = require("express");
const api = require("./api");

// create server
const app = express();
const server = http.createServer(app);

api.route(app);

server.listen(3000, () => {
  console.info("[APP]", `listening on port 3000.`);
});

module.exports = server;
