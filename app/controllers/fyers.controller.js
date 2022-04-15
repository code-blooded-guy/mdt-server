const db = require("../models");
const Fyers = db.fyers;
const Op = db.Op;

// Create and Save a new Fyers
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Fyers
  const book = {
    title: req.body.title,
    author: req.body.author,
    published: req.body.published ? req.body.published : false,
  };

  // Save Fyers in database
  Fyers.create(book)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Fyers.",
      });
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
