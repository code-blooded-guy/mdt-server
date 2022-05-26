const db = require("../models");
const Angle = db.angle;
const Op = db.Op;
const moment = require("moment");
const tulind = require("tulind");
const { VO, RSI } = require("bfx-hf-indicators");

// const io = require("../../server");
const { sendData, getData } = require("../../utils/socket-io");
// const io = require("socket.io")(server);

// Create and Save a new Angle
exports.link = (req, res) => {
  // Validate request
  try {
    let { SmartAPI, WebSocket } = require("smartapi-javascript");

    let smart_api = new SmartAPI({
      api_key: "Dh7Po2Hm",
    });
    let url = smart_api.getLoginURL();
    res.status(200).send({ status: true, login_url: url });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Something went wrong, please try again",
    });
  }
};
exports.relink = (req, res) => {
  // Validate request
  try {
    let { SmartAPI, WebSocket } = require("smartapi-javascript");

    let smart_api = new SmartAPI({
      api_key: "Dh7Po2Hm",
    });
    let url = smart_api.getLoginURL();
    res.status(200).send({ status: true, login_url: url });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Something went wrong, please try again",
    });
  }
};

// Create and Save a new Angle Account
exports.create = (req, res) => {
  // Validate request
  if (!req.body.access_token) {
    res.status(400).send({
      message: "access_token can not be empty!",
    });
    return;
  }
  if (!req.body.refresh_token) {
    res.status(400).send({
      message: "access_token can not be empty!",
    });
    return;
  }

  // Create a Angle
  const payload = {
    accessToken: req.body.access_token,
    refreshToken: req.body.refresh_token,
    userId: req.userId,
  };

  // Save Angle in database
  Angle.create(payload)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message == "Validation error") {
        err.message =
          "One account is already linked with this user, you can update it";
      }
      res.status(500).send({
        status: false,
        message:
          err.message ||
          "Some thing went wrong while adding the Angle account.",
      });
    });
};

exports.update = (req, res) => {
  // Validate request
  console.log("rb", req.body);
  if (!req.body.access_token) {
    res.status(400).send({
      message: "access_token can not be empty!",
    });
    return;
  }
  if (!req.body.refresh_token) {
    res.status(400).send({
      message: "access_token can not be empty!",
    });
    return;
  }

  // Create a Angle
  const payload = {
    accessToken: req.body.access_token,
    refreshToken: req.body.refresh_token,
  };

  // Save Angle in database
  Angle.update(payload, {
    where: {
      id: req.body.id,
      userId: req.userId,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        message:
          err.message ||
          "Some thing went wrong while adding the Angle account.",
      });
    });
};

exports.find = (req, res) => {
  Angle.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ status: false, message: "Data Not found." });
      }
      res.status(200).send({ status: true, result: data });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.profile = (req, res) => {
  Angle.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          status: false,
          message:
            "Angle one Account not linked, please link account and try again.",
        });
      }
      let { SmartAPI, WebSocket } = require("smartapi-javascript");

      let smart_api = new SmartAPI({
        api_key: "Dh7Po2Hm",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      var result = await smart_api.getProfile();
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.holdings = (req, res) => {
  Angle.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          status: false,
          message:
            "Angle one Account not linked, please link account and try again.",
        });
      }
      let { SmartAPI, WebSocket } = require("smartapi-javascript");

      let smart_api = new SmartAPI({
        api_key: "Dh7Po2Hm",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      var result = await smart_api.getHolding();
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.getPosition = (req, res) => {
  Angle.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          status: false,
          message:
            "Angle one Account not linked, please link account and try again.",
        });
      }
      let { SmartAPI, WebSocket } = require("smartapi-javascript");

      let smart_api = new SmartAPI({
        api_key: "Dh7Po2Hm",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      var result = await smart_api.getPosition();
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.funds = (req, res) => {
  Angle.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          status: false,
          message:
            "Angle one Account not linked, please link account and try again.",
        });
      }
      let { SmartAPI, WebSocket } = require("smartapi-javascript");

      let smart_api = new SmartAPI({
        api_key: "Dh7Po2Hm",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      var result = await smart_api.getRMS();
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.getOrderBook = (req, res) => {
  Angle.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          status: false,
          message:
            "Angle one Account not linked, please link account and try again.",
        });
      }
      let { SmartAPI, WebSocket } = require("smartapi-javascript");

      let smart_api = new SmartAPI({
        api_key: "Dh7Po2Hm",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      var result = await smart_api.getOrderBook();
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.getTradeBook = (req, res) => {
  Angle.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          status: false,
          message:
            "Angle one Account not linked, please link account and try again.",
        });
      }
      let { SmartAPI, WebSocket } = require("smartapi-javascript");

      let smart_api = new SmartAPI({
        api_key: "Dh7Po2Hm",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      var result = await smart_api.getTradeBook();
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.placeOrder = (req, res) => {
  Angle.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          status: false,
          message:
            "Angle one Account not linked, please link account and try again.",
        });
      }
      let { SmartAPI, WebSocket } = require("smartapi-javascript");

      let smart_api = new SmartAPI({
        api_key: "Dh7Po2Hm",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      var result = await smart_api.placeOrder(req.body);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.modifyOrder = (req, res) => {
  Angle.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          status: false,
          message:
            "Angle one Account not linked, please link account and try again.",
        });
      }
      let { SmartAPI, WebSocket } = require("smartapi-javascript");

      let smart_api = new SmartAPI({
        api_key: "Dh7Po2Hm",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      var result = await smart_api.modifyOrder(req.body);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.cancelOrder = (req, res) => {
  Angle.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          status: false,
          message:
            "Angle one Account not linked, please link account and try again.",
        });
      }
      let { SmartAPI, WebSocket } = require("smartapi-javascript");

      let smart_api = new SmartAPI({
        api_key: "Dh7Po2Hm",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      var result = await smart_api.cancelOrder(req.body);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

// Retrieve all Angles from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Angle.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving Angle.",
      });
    });
};

// Find a single Angle with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Angle.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Angle with id = ${id}`,
      });
    });
};

// Update a Angle by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Angle.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Angle was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Angle with id=${id}. Maybe Angle was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Angle with id=" + id,
      });
    });
};

// Delete a Angle with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Angle.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Angle was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Angle with id=${id}. Maybe Angle was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Angle with id=" + id,
      });
    });
};

// Delete all Angles from the database.
exports.deleteAll = (req, res) => {
  Angle.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Angles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Angle.",
      });
    });
};

// Find all published Angles
exports.findAllPublished = (req, res) => {
  Angle.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Angle.",
      });
    });
};

exports.live_feed = (req, res) => {
  Angle.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          status: false,
          message:
            "Angle one Account not linked, please link account and try again.",
        });
      }
      let { SmartAPI, WebSocket } = require("smartapi-javascript");
      let smart_api = new SmartAPI({
        api_key: "Dh7Po2Hm",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      // let feedToken = smart_api.getfeedToken()
      var feed_token = await smart_api
        .generateSession("A1008717", "Archie@8031")
        .then((data) => {
          return data.data.feedToken;
        });
      console.log("feed", feed_token);
      let smart_api2 = new SmartAPI({
        api_key: "Dh7Po2Hm",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });

      let web_socket = new WebSocket({
        client_code: "A1008717",
        feed_token: feed_token,
      });

      web_socket.connect().then(() => {
        web_socket.runScript("nse_cm|2885", "mw"); // SCRIPT:nse_cm|12184, nse_cm|2885, mcx_fo|222900  TASK: mw|sfi|dp

        // setTimeout(function () {
        //   web_socket.close();
        // }, 3000);
      });

      web_socket.on("tick", (data) => {
        console.log("receiveTick:::::", data);
        sendData(req.userId, "live_price", data, (result) => {
          //broadcast the new message
          console.log("resulttt", result);
          // io.sockets.emit("live_price", { data: data });
        });
        // res.status(200).send(result);
      });
      res.status(200).send({
        type: "web-socket",
        listen: "live_price",
      });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.volume_strategy = (req, res) => {
  Angle.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          status: false,
          message:
            "Angle one Account not linked, please link account and try again.",
        });
      }
      let { SmartAPI, WebSocket } = require("smartapi-javascript");
      let smart_api = new SmartAPI({
        api_key: "Dh7Po2Hm",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      var date = new Date();
      var backdate = date.setDate(date.getDate() - 5);
      console.log("bd", formatDate(new Date()), formatDate(backdate));
      var delay = 1;
      var interval = "FIFTEEN_MINUTE";
      var symboltoken = "10604";
      var data = {
        exchange: "NSE",
        symboltoken: symboltoken,
        interval: interval,
        fromdate: formatDate(backdate),
        todate: formatDate(new Date()),
      };
      var feed_token = await smart_api
        .generateSession("A1008717", "Archie@8031")
        .then((data) => {
          return data.data.feedToken;
        });
      console.log("feed", feed_token);
      var volumes = [];
      smart_api.getCandleData(data).then((data) => {
        console.log("data", data);
        var last_candle = data.data[data.data.length - 1];
        var lct = last_candle[0].replace(":00+05:30", "");
        data.data.forEach((element) => {
          volumes.push(parseInt(element[5]));
        });
        console.log("v", volumes.length);
        var volume = volumes.slice(-50);
        console.log("v2", volume.length);
        var avg_volume = getAverage(volume);
        console.log(avg_volume);

        var web_socket = new WebSocket({
          client_code: "A1008717",
          feed_token: feed_token,
        });

        web_socket.connect().then(() => {
          web_socket.runScript("nse_cm|10604", "mw"); // SCRIPT:nse_cm|12184, nse_cm|2885, mcx_fo|222900  TASK: mw|sfi|dp
        });
        web_socket.on("closed", async (data) => {
          console.log("closedddd-----", data);
          web_socket = new WebSocket({
            client_code: "A1008717",
            feed_token: feed_token,
          });

          web_socket.connect().then(() => {
            web_socket.runScript("nse_cm|10604", "mw"); // SCRIPT:nse_cm|12184, nse_cm|2885, mcx_fo|222900  TASK: mw|sfi|dp

            // setTimeout(function () {
            //   web_socket.close();
            // }, 3000);
          });
        });
        web_socket.on("tick", async (data) => {
          // console.log("receiveTick:::::", data);
          console.log(
            "last_candle_time",
            last_candle[0].replace(":00+05:30", "")
          );
          var new_candle_time = formatDate(
            new Date(last_candle[0].replace(":00+05:30", "")).getTime() +
              delay * 60000
          );
          console.log("new can", new_candle_time);
          console.log("cur", formatDate(new Date()));
          // console.log(data);
          if (data[0] && data[0].ltp && data[0]["v"]) {
            var last_traded_price = data[0].ltp;
            console.log(
              "**********************last_traded_price: ",
              last_traded_price
            );
            console.log("volume: ", parseInt(data[0].v));
            console.log("avg_volume: ", avg_volume);
            if (new Date() > new Date(new_candle_time)) {
              console.log(
                "-----------------new_candle_time is greater than current",
                last_candle[2]
              );
              var data2 = {
                exchange: "NSE",
                symboltoken: symboltoken,
                interval: interval,
                fromdate: formatDate(lct),
                todate: formatDate(new Date()),
              };
              smart_api.getCandleData(data2).then((data) => {
                // console.log("data2", data);
                last_candle = data.data[data.data.length - 1];
                console.log("data2", last_candle);
                lct = last_candle[0].replace(":00+05:30", "");
                volumes.push(parseInt(last_candle[5]));
                // console.log("v", volumes.length);
                volume = volumes.slice(-50);
                // console.log("v2", volume.length);
                avg_volume = getAverage(volume);
                // console.log(avg_volume);
              });
              if (parseInt(data[0].v) > avg_volume) {
                // last_traded_price > last_candle[2]
                console.log(
                  "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++upppppp"
                );
                var next_candle_time = formatDate(
                  new Date(new_candle_time.replace(":00+05:30", "")).getTime() +
                    delay * 60000
                );
                console.log("next_candle_time", next_candle_time);
                if (new Date() > new Date(next_candle_time)) {
                  console.log(
                    "+++++++++++++++++next_candle_time is greater than current"
                  );
                  var data3 = {
                    exchange: "NSE",
                    symboltoken: symboltoken,
                    interval: interval,
                    fromdate: formatDate(lct),
                    todate: formatDate(new Date()),
                  };
                  smart_api.getCandleData(data3).then((data) => {
                    last_candle = data.data[data.data.length - 1];
                    console.log("data3", last_candle);
                    let high_price = last_candle[2];
                    let low_price = last_candle[3];
                    if (last_traded_price > high_price) {
                      console.log(
                        "BUYYYYYYYYY",
                        formatDate(new Date()),
                        last_traded_price,
                        high_price
                      );
                      web_socket.close();
                    }
                  });
                }
              } else {
                console.log(
                  "--------------------------------------------------Downnn"
                );
                volume.splice(0, 1);
                volume.push(parseInt(data[0].v));
                // console.log("len", volume.length);
                avg_volume = await getAverage(volume);
                // console.log("avg2", avg_volume);
              }
            }
          }
        });
        res.status(200).send({
          type: "web-socket",
          listen: "live_price",
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.volume_strategy2 = (req, res) => {
  Angle.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          status: false,
          message:
            "Angle one Account not linked, please link account and try again.",
        });
      }
      let { SmartAPI, WebSocket } = require("smartapi-javascript");
      let smart_api = new SmartAPI({
        api_key: "Dh7Po2Hm",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      var feed_token = await smart_api
        .generateSession("A1008717", "Archie@8031")
        .then((data) => {
          return data.data.feedToken;
        });
      console.log("feed", feed_token);
      var triggered = false;
      var web_socket = new WebSocket({
        client_code: "A1008717",
        feed_token: feed_token,
      });
      var script = "nse_cm|10604";
      web_socket.connect().then(() => {
        web_socket.runScript(script, "mw"); // SCRIPT:nse_cm|12184, nse_cm|2885, mcx_fo|222900  TASK: mw|sfi|dp
      });
      web_socket.on("closed", async (data) => {
        console.log("closedddd-----", data);
        web_socket = new WebSocket({
          client_code: "A1008717",
          feed_token: feed_token,
        });

        web_socket.connect().then(() => {
          web_socket.runScript(script, "mw"); // SCRIPT:nse_cm|12184, nse_cm|2885, mcx_fo|222900  TASK: mw|sfi|dp

          // setTimeout(function () {
          //   web_socket.close();
          // }, 3000);
        });
      });
      web_socket.on("tick", async (feed) => {
        // console.log("receiveTick:::::", feed);
        var delay = 15;
        var date = new Date();
        var backdate = date.setDate(date.getDate() - 1);

        var interval = "FIFTEEN_MINUTE";
        var symboltoken = "10604";
        var data = {
          exchange: "NSE",
          symboltoken: symboltoken,
          interval: interval,
          fromdate: formatDate(new Date(date).getTime() - 30 * 60000),
          todate: formatDate(new Date()),
        };
        console.log(
          "bdate",
          formatDate(new Date()),
          formatDate(new Date(date).getTime() - 30 * 60000)
        );
        smart_api.getCandleData(data).then((data) => {
          console.log("last candle", data.data[data.data.length - 2]);
          var last_candle = data.data[data.data.length - 2];
          var lct = last_candle[0].replace(":00+05:30", "");
          var lcv = parseInt(last_candle[5]);
          var last_high = parseInt(last_candle[2]);
          var last_low = parseInt(last_candle[3]);
          console.log("last candle volume-----", lcv);
          if (feed[0] && feed[0].ltp && feed[0].v) {
            console.log("current volume-----", parseInt(feed[0].v));
            if (!triggered) {
              if (lcv > 500120 && lcv < 1100120) {
                console.log(
                  "Triggred-----++++++++++++++*************************************************"
                );
                triggered = true;
                var new_candle_time = formatDate(
                  new Date(lct).getTime() + delay * 60000
                );
              }
            } else {
              if (new Date() >= new Date(new_candle_time)) {
                var last_traded_price = feed[0].ltp;
                console.log(
                  "**********************last_traded_price: ",
                  last_traded_price
                );
                console.log("last_high: ", last_high);
                console.log("last_low: ", last_low);
                if (last_traded_price > last_high) {
                  console.log(
                    "+++++++++++++++++++++++++++++++++++++++++++++++++++++BUYY"
                  );
                  web_socket.close();

                  if (last_traded_price < last_low) {
                    console.log(
                      "-----------------------------------------------------SELLL"
                    );
                    web_socket.close();
                  }
                }
              }
            }
          }
        });
        // var volumes = [];
      });
      res.status(200).send({
        type: "web-socket",
        listen: "live_price",
      });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.volume_strategy3 = (req, res) => {
  Angle.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          status: false,
          message:
            "Angle one Account not linked, please link account and try again.",
        });
      }
      var rsi = new RSI([14]);
      // var vo = new VO([50]);
      let assert = require("assert");
      var VolumeProfile = require("technicalindicators").VolumeProfile;
      // var priceFallsBetweenBarRange = VolumeProfile.priceFallsBetweenBarRange;
      let { SmartAPI, WebSocket } = require("smartapi-javascript");
      let smart_api = new SmartAPI({
        api_key: "Dh7Po2Hm",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      var feed_token = await smart_api
        .generateSession("A1008717", "Archie@8031")
        .then((data) => {
          return data.data.feedToken;
        });
      console.log("feed", feed_token);
      var triggered = false;
      var last_vol_avg = 0;
      var web_socket = new WebSocket({
        client_code: "A1008717",
        feed_token: feed_token,
      });
      var script = "nse_cm|2885";
      web_socket.connect().then(() => {
        web_socket.runScript(script, "mw"); // SCRIPT:nse_cm|12184, nse_cm|2885, mcx_fo|222900  TASK: mw|sfi|dp
      });
      web_socket.on("closed", async (data) => {
        console.log("closedddd-----", data);
        web_socket = new WebSocket({
          client_code: "A1008717",
          feed_token: feed_token,
        });

        web_socket.connect().then(() => {
          web_socket.runScript(script, "mw"); // SCRIPT:nse_cm|12184, nse_cm|2885, mcx_fo|222900  TASK: mw|sfi|dp

          // setTimeout(function () {
          //   web_socket.close();
          // }, 3000);
        });
      });
      web_socket.on("tick", async (feed) => {
        // console.log("receiveTick:::::", feed);
        var delay = 15;
        var date = new Date();
        var backdate = date.setDate(date.getDate() - 5);

        var interval = "FIFTEEN_MINUTE";
        var symboltoken = "2885";
        var data = {
          exchange: "NSE",
          symboltoken: symboltoken,
          interval: interval,
          fromdate: formatDate(backdate),
          todate: formatDate(new Date()),
        };
        // console.log("bdate", formatDate(new Date()), formatDate(backdate));
        // var volumes = [];
        smart_api.getCandleData(data).then((data) => {
          // console.log("last candle", data.data[data.data.length - 2]);
          var last_candle = data.data[data.data.length - 1];
          var lct = last_candle[0].replace(":00+05:30", "");
          var lcv = parseInt(last_candle[5]);
          var last_high = parseInt(last_candle[2]);
          var last_low = parseInt(last_candle[3]);
          console.log("last candle volume-----", lcv);
          // data.data.forEach((element) => {
          //   volumes.push(parseInt(element[5]));
          // });
          var volumes = data.data.map((d) => d[5]).slice(-50);
          var high = data.data.map((d) => d[2]).slice(-50);
          var open = data.data.map((d) => d[1]).slice(-50);
          var low = data.data.map((d) => d[3]).slice(-50);
          var close = data.data.map((d) => d[4]).slice(-50);
          let input = {
            high: high,
            open: open,
            low: low,
            close: close,
            volume: volumes,
            noOfBars: 50,
          };
          // console.log(input);
          let volumeprofile = VolumeProfile.calculate(input);
          console.log("volumeprofile", volumeprofile[volumeprofile.length - 1]);
          // assert.deepEqual(
          //   volumeprofile.getResult(),
          //   (result) => {
          //     console.log("volllluummmmee", result);
          //   },
          //   "Wrong Results while calculating next bar"
          // );
          // assert.deepEqual(
          //   VolumeProfile.calculate(input),
          //   (result) => {
          //     console.log("volllluummmmee", result);
          //   },
          //   "Wrong Results"
          // );
          // console.log("v", volumes.length);
          // var volume = volumes.slice(-50);
          // console.log("v2", volume.length);
          // var avg_volume = getAverage(volume);
          // volume.forEach((ele) => {
          //   VolumeProfile.add(ele);
          // });
          // console.log("volummmmmeee", vo.v());
          // tulind.indicators.sma.indicator([volumes], [50], (err, res) => {
          //   if (err) return console.log(err);
          //   console.log("SMA", res[0].slice(-1)[0]);
          //   // log(res[0].slice(-1)[0]);
          // });
          // console.log("AVG--", avg_volume);
          // var new_candle_time = formatDate(
          //   new Date(lct).getTime() + 15 * 60000
          // );
          // if (feed[0] && feed[0].ltp && feed[0].v) {
          //   console.log(
          //     "datess-----",
          //     formatDate(new Date()),
          //     new_candle_time,
          //     new Date() > new Date(new_candle_time)
          //   );
          //   console.log("LAST PRICE : ", feed[0].ltp);
          //   if (!triggered) {
          //     console.log("last_vol_avg--", last_vol_avg);
          //     if (new Date() > new Date(new_candle_time)) {
          //       console.log(
          //         "INNN new_candle_time ------------ ",
          //         new_candle_time
          //       );
          //       // new_candle_time = formatDate(
          //       //   new Date(new_candle_time).getTime() + delay * 60000
          //       // );
          //       last_vol_avg = avg_volume;
          //     }
          //     if (last_vol_avg != 0 && avg_volume > last_vol_avg) {
          //       triggered = true;
          //     }
          //   } else {
          //     console.log(
          //       "=======+++++++++--------*********TRIGGERED********--------++++++++++========"
          //     );
          //     var last_traded_price = feed[0].ltp;
          //     console.log(
          //       "**********************last_traded_price: ",
          //       last_traded_price
          //     );
          //     console.log("last_high: ", last_high);
          //     console.log("last_low: ", last_low);
          //     if (parseInt(last_traded_price) > parseInt(last_high)) {
          //       console.log(
          //         "+++++++++++++++++++++++++++++++++++++++++++++++++++++BUYY"
          //       );
          //       web_socket.close();

          //       if (parseInt(last_traded_price) < parseInt(last_low)) {
          //         console.log(
          //           "-----------------------------------------------------SELLL"
          //         );
          //         web_socket.close();
          //       }
          //     }
          //   }
          // }
        });
        // var volumes = [];
      });
      res.status(200).send({
        type: "web-socket",
        listen: "live_price",
      });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.test = (req, res) => {
  Angle.findOne({
    where: {
      userId: req.userId,
    },
  })
    .then(async (data) => {
      if (!data) {
        return res.status(404).send({
          status: false,
          message:
            "Angle one Account not linked, please link account and try again.",
        });
      }
      let { SmartAPI, WebSocket } = require("smartapi-javascript");
      let smart_api = new SmartAPI({
        api_key: "Dh7Po2Hm",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      var data = {
        exchange: "NSE",
        symboltoken: "3045",
        interval: "ONE_MINUTE",
        fromdate: "2022-05-09 10:59",
        todate: "2022-05-09 11:00",
      };
      smart_api.getCandleData(data).then((data) => {
        console.log("data", data);
      });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

function receiveTick(data) {
  console.log("receiveTick:::::", data);
  sendData("live_price", data, (result) => {
    //broadcast the new message
    console.log("resulttt", result);
    // io.sockets.emit("live_price", { data: data });
  });

  // io.on("live_price", (result) => {
  //   //broadcast the new message
  //   io.sockets.emit("live_price", { data: data });
  // });
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  minute = ("0" + d.getMinutes()).slice(-2);
  hour = ("0" + d.getHours()).slice(-2);

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  // if (hour.length < 2) day = "0" + hour;

  return [year, month, day].join("-") + " " + [hour, minute].join(":");
}

function getAverage(volume) {
  // console.log("volll", volume);
  var sum = volume.reduce((a, b) => a + b, 0);
  var avg = sum / volume.length || 0;
  // console.log(`The sum is: ${sum}. The average is: ${avg}.`);
  return avg;
}
