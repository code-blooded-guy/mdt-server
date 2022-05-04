const controller = require("../controllers/fyers.controller.js");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.post("/api/fyers/link-account", [authJwt.verifyToken], controller.link);
  app.post("/api/fyers/add-account", [authJwt.verifyToken], controller.create);
  app.get("/api/fyers/get-account", [authJwt.verifyToken], controller.find);
  app.post("/api/fyers/profile", [authJwt.verifyToken], controller.profile);
};
