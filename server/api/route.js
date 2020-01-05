const express = require("express");

const route = app => {
  const router = express.Router();
  app.use(router);

  router.get("/health", (req, res) => {
    res.sendStatus(200);
  });
};

module.exports = route;
