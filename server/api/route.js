const express = require("express");

const users = require("./users");
const shops = require("./shops");
const tags = require("./tags");

const route = app => {
  const router = express.Router();
  app.use(router);

  router.get("/health", (req, res) => {
    res.sendStatus(200);
  });

  app.use("/api/shops", shops);
  app.use("/api/users", users);
  app.use("/api/tags", tags);

  return app;
};

module.exports = route;
