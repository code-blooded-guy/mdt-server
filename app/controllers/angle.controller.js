const db = require("../models");
const Angle = db.angle;
const Op = db.Op;

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
      // let smart_api = new SmartAPI({
      //   api_key: "Dh7Po2Hm",
      //   access_token: data.accessToken,
      //   refresh_token: data.refreshToken,
      // });
      // smart_api.generateSession().then((data) => {
      //   console.log("data", data);
      // });

      let web_socket = new WebSocket({
        client_code: "A1008717",
        feed_token: "0858641675",
      });

      web_socket.connect().then(() => {
        web_socket.runScript("nse_cm|2885", "cn|mw|sfi|dp"); // SCRIPT: nse_cm|2885, mcx_fo|222900  TASK: mw|sfi|dp

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
