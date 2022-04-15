const db = require("../models");
const User = db.user;
const email = require("./email.controller");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.verify = (req, res) => {
  console.log(req);
  User.findOne({
    where: {
      id: req.userId,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ status: false, message: "User Not found." });
      }
      if (user.otp == req.body.otp) {
        User.update(
          { isVerified: true },
          {
            where: { id: req.userId },
          }
        );
        res
          .status(200)
          .send({ status: true, message: "User verified successfully." });
      } else {
        res.status(200).send({ status: false, message: "Invalid OTP" });
      }
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.resendOtp = (req, res) => {
  console.log(req);
  User.findOne({
    where: {
      id: req.userId,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ status: false, message: "User Not found." });
      }
      var otp = Math.floor(100000 + Math.random() * 900000);
      email.sendConfirmationEmail(user.first_name, user.email, otp);
      User.update(
        { otp: otp },
        {
          where: { id: req.userId },
        }
      );
      res.status(200).send({ status: true, message: "OTP sent successfully." });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};
