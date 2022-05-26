const controller = require("../controllers/angle.controller.js");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.post("/api/angle/link-account", [authJwt.verifyToken], controller.link);
  app.post("/api/angle", [authJwt.verifyToken], controller.create);
  app.put("/api/angle/:id", [authJwt.verifyToken], controller.update);
  app.get("/api/angle", [authJwt.verifyToken], controller.find);
  app.get("/api/angle/profile", [authJwt.verifyToken], controller.profile);
  app.get("/api/angle/holdings", [authJwt.verifyToken], controller.holdings);
  app.get(
    "/api/angle/positions",
    [authJwt.verifyToken],
    controller.getPosition
  );
  app.get("/api/angle/funds", [authJwt.verifyToken], controller.funds);
  app.get(
    "/api/angle/orderBook",
    [authJwt.verifyToken],
    controller.getOrderBook
  );
  app.get(
    "/api/angle/tradeBook",
    [authJwt.verifyToken],
    controller.getTradeBook
  );

  app.post(
    "/api/angle/placeOrder",
    [authJwt.verifyToken],
    controller.placeOrder
  );
  app.post(
    "/api/angle/modifyOrder",
    [authJwt.verifyToken],
    controller.modifyOrder
  );
  app.post(
    "/api/angle/cancelOrder",
    [authJwt.verifyToken],
    controller.cancelOrder
  );

  app.post("/api/angle/live_feed", [authJwt.verifyToken], controller.live_feed);
  app.post(
    "/api/angle/volume_strategy",
    [authJwt.verifyToken],
    controller.volume_strategy3
  );

  //   test
  app.get("/api/angle/test", [authJwt.verifyToken], controller.test);
};
