const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const email = require("./email.controller");
const User = db.user;
const Role = db.role;
const Op = db.Op;

exports.signup = (req, res) => {
  // Save user to database
  var otp = Math.floor(100000 + Math.random() * 900000);

  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    mobile: req.body.mobile,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    plan: req.body.plan,
    otp: otp,
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            let token = jwt.sign({ id: user.id }, config.auth.secret, {
              expiresIn: 86400, // 24 hours
            });

            let authorities = [];
            user.getRoles().then((roles) => {
              for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
              }
              email.sendConfirmationEmail(
                req.body.first_name,
                req.body.email,
                otp
              );

              res.status(200).send({
                status: true,
                message: "User registered successfully!",
                user: {
                  id: user.id,
                  mobile: user.mobile,
                  email: user.email,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  plan: user.plan,
                  roles: authorities,
                  accessToken: token,
                },
              });
            });
          });
        });
      } else {
        // User role 1
        user.setRoles([1]).then(() => {
          let token = jwt.sign({ id: user.id }, config.auth.secret, {
            expiresIn: 86400, // 24 hours
          });

          let authorities = [];
          user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            email.sendConfirmationEmail(
              req.body.first_name,
              req.body.email,
              otp
            );
            res.status(200).send({
              status: true,
              message: "User registered successfully!",
              user: {
                id: user.id,
                mobile: user.mobile,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                plan: user.plan,
                roles: authorities,
                accessToken: token,
              },
            });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      mobile: req.body.mobile,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      let token = jwt.sign({ id: user.id }, config.auth.secret, {
        expiresIn: 86400, // 24 hours
      });

      let authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        res.status(200).send({
          id: user.id,
          mobile: user.mobile,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          isVerified: user.isVerified,
          plan: user.plan ? user.plan : "No active plans",
          isSubscribed: user.isSubscribed,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
