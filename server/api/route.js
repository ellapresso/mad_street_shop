const express = require("express");
const shops = require("./shops");

const route = app => {
  const router = express.Router();
  app.use(router);

  router.get("/health", (req, res) => {
    res.sendStatus(200);
  });
  app.use("/api/shops", shops);
};

module.exports = route;
