const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Mails = require("../../emails/Mails")

// Load Notification model
const ForgotPasswordToken = require("../../models/ForgotPasswordToken");
const User = require("../../models/User");

// @route GET api/notifications/getNotificationsNumber
// @desc get number of notifications for a specific user
// @access Public
router.post('/newToken', (req, res) => {
  let email = req.body.email;
  let now = Date.now();
  const digit = Math.floor(100000 + Math.random() * 900000).toString()

  Mails.forgotPassword(email, digit)

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(digit, salt, (err, hash) => {
      if (err) throw err;
      const forgotPasswordToken = new ForgotPasswordToken({
        email: email,
        expires_in: now + 600000,
        code: hash,
      })
      forgotPasswordToken.save().then(token => res.status(200).send(token))
    })
  })
})

// @route GET api/notifications/getNotificationsNumber
// @desc get number of notifications for a specific user
// @access Public
router.get('/checkToken', (req, res) => {
  let code = req.query.code;
  let token_id = req.query.token_id;

  ForgotPasswordToken.findOne({ _id: token_id }, (err, token) => {
    if (err) {
      res.status(400).send({ error: err })
    } else if (token) {
      bcrypt.compare(code, token.code, function (error, success) {
        if (error) {
          res.status(400).send({ error: error })
        } else if (success) {
          res.status(200).send({ success: "code bon" })
        } else if (!success) {
          res.status(200).send({ failure: "Ce n'est pas le bon code" })
        }
      })
    } else if (!token) {
      res.status(200).send({ failure: "Le code à expiré, veuillez recommencer" })
    }
  })
})

module.exports = router;