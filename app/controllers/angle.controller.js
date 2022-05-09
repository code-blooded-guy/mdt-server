const db = require("../models");
const Angle = db.angle;
const Op = db.Op;
const moment = require("moment");

// const io = require("../../server");
const { sendData, getData } = require("../../utils/socket-io");
// const io = require("socket.io")(server);

// Create and Save a new Angle
exports.link = (req, res) => {
  // Validate request
  try {
    let { SmartAPI, WebSocket } = require("smartapi-javascript");

    let smart_api = new SmartAPI({
      api_key: "PrKdWGhq",
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
      api_key: "PrKdWGhq",
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
        api_key: "PrKdWGhq",
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
        api_key: "PrKdWGhq",
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
        api_key: "PrKdWGhq",
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
        api_key: "PrKdWGhq",
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
        api_key: "PrKdWGhq",
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
        api_key: "PrKdWGhq",
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
        api_key: "PrKdWGhq",
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
        api_key: "PrKdWGhq",
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
        api_key: "PrKdWGhq",
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
        api_key: "PrKdWGhq",
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
        api_key: "PrKdWGhq",
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
        api_key: "PrKdWGhq",
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      });
      var date = new Date();
      var backdate = date.setDate(date.getDate() - 5);
      console.log("bd", formatDate(new Date()), formatDate(backdate));
      var data = {
        exchange: "NSE",
        symboltoken: "2885",
        interval: "FIFTEEN_MINUTE",
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
        data.data.forEach((element) => {
          volumes.push(parseInt(element[5]));
        });
        console.log("v", volumes.length);
        var volume = volumes.slice(-50);
        console.log("v2", volume.length);
        var avg_volume = getAverage(volume);
        console.log(avg_volume);

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

        web_socket.on("tick", async (data) => {
          // console.log("receiveTick:::::", data);
          // sendData(req.userId, "live_price", data, (result) => {
          //   console.log("resulttt", result);
          // });
          // console.log("data.v", data[0]["v"] ? data[0]["v"] : null);
          console.log(
            "last_candle_time",
            last_candle[0].replace(":00+05:30", "")
          );
          var new_candle_time = formatDate(
            new Date(last_candle[0].replace(":00+05:30", "")).getTime() +
              15 * 60000
          );
          console.log("new can", new Date(new_candle_time).getTime());
          console.log("cur", new Date().getTime());
          if (data[0] && data[0].ltp && data[0]["v"]) {
            var last_traded_price = data[0].ltp;
            if (new Date(new_candle_time).getTime() > new Date().getTime()) {
              if (
                parseInt(data[0].v) > avg_volume &&
                last_traded_price > last_candle[2]
              ) {
                console.log("upppppp");
                var next_candle_time = formatDate(
                  new Date(last_candle[0].replace(":00+05:30", "")).getTime() +
                    15 * 60000
                );
                if (
                  new Date(next_candle_time).getTime() > new Date().getTime()
                ) {
                  smart_api.getCandleData(data).then((data) => {
                    console.log("data", data);
                    last_candle = data.data[data.data.length - 1];
                    let high_price = last_candle[2];
                    let low_price = last_candle[3];
                    if (last_traded_price > high_price) {
                      console.log("BUYYYYYYYYY", formatDate(new Date()));
                      web_socket.close();
                    }
                    // if(last_traded_price < low_price){
                    //   console.log("SELLLLLL",formatDate(new Date()))
                    // }
                    // data.data.forEach((element) => {
                    //   volumes.push(element[5]);
                    // });
                    // console.log("v", volumes.length);
                    // volume = volumes.slice(-50);
                    // console.log("v2", volume.length);
                    // avg_volume = getAverage(volume);
                    // console.log(avg_volume);
                  });
                }
              } else {
                console.log("Downnn", data);
                volume.splice(0, 1);
                volume.push(parseInt(data[0].v));
                console.log("len", volume.length);
                avg_volume = await getAverage(volume);
                console.log("avg2", avg_volume);
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
        api_key: "PrKdWGhq",
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
  hour = d.getHours();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-") + " " + [hour, minute].join(":");
}

function getAverage(volume) {
  // console.log("volll", volume);
  var sum = volume.reduce((a, b) => a + b, 0);
  var avg = sum / volume.length || 0;
  console.log(`The sum is: ${sum}. The average is: ${avg}.`);
  return avg;
}
