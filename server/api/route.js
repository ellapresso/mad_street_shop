const express = require("express");

const route = app => {
  const router = express.Router();
  app.use(router);

  router.get("/health", (req, res) => {
    res.sendStatus(200);
  });

  app.use("/api/users", require("./users"));
  app.use("/api/shops", require("./shops"));
  app.use("/api/favorites", require("./favorites"));
  app.use("/api/tags", require("./tags"));
  app.use("/api/etc", require("./etc"));

  return app;
};

module.exports = route;
