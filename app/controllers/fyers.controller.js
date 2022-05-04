const db = require("../models");
const Fyers = db.fyers;
const Op = db.Op;
const fyers = require("fyers-api-v2");

fyers.setAppId("3KDENVCVTW-100");

// Create and Save a new Fyers
exports.link = (req, res) => {
  // Validate request
  try {
    let app_secret = "1W12NWTXPQ";
    let app_id = "3KDENVCVTW-100";
    let redirect_url = req.body.redirect_url;
    // fyers.setAppId(app_id);
    // fyers.setRedirectUrl("http://localhost:3001/token");
    let url =
      "https://api.fyers.in/api/v2/generate-authcode?client_id=" +
      app_id +
      "&redirect_uri=" +
      redirect_url +
      "&response_type=code&state=sample_state";
    // let url = fyers.generateAuthCode();
    res.status(200).send({ status: true, login_url: url });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Something went wrong, please try again",
    });
  }
};

// Create and Save a new Fyers Account
exports.create = (req, res) => {
  // Validate request
  if (!req.body.access_token) {
    res.status(400).send({
      message: "access_token can not be empty!",
    });
    return;
  }

  // Create a Fyers
  const payload = {
    accessToken: req.body.access_token,
    userId: req.userId,
  };

  // Save Fyers in database
  Fyers.create(payload)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        message:
          err.message ||
          "Some thing went wrong while adding the Fyers account.",
      });
    });
};

exports.find = (req, res) => {
  Fyers.findOne({
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
  /*Copy the access token and paste it here. NOTE : Make sure for running 
any api 
fyers.setAccessToken and setAppId is set or it will throw error. */
  console.log(req.body.accessToken);
  fyers.setAccessToken(req.body.accessToken);

  fyers.get_profile().then((response) => {
    console.log(response);
  });
};

// Retrieve all Fyerss from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Fyers.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving fyers.",
      });
    });
};

// Find a single Fyers with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Fyers.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Fyers with id = ${id}`,
      });
    });
};

// Update a Fyers by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Fyers.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Fyers was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Fyers with id=${id}. Maybe Fyers was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Fyers with id=" + id,
      });
    });
};

// Delete a Fyers with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Fyers.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Fyers was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Fyers with id=${id}. Maybe Fyers was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Fyers with id=" + id,
      });
    });
};

// Delete all Fyerss from the database.
exports.deleteAll = (req, res) => {
  Fyers.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Fyerss were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all fyers.",
      });
    });
};

// Find all published Fyerss
exports.findAllPublished = (req, res) => {
  Fyers.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving fyers.",
      });
    });
};
