const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const Mails = require("../../emails/Mails")
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateChangeEmail = require("../../validation/changeMail");
const validateChangePassword = require("../../validation/changePassword");

// Load User model
const User = require("../../models/User");
const EmailCheckToken = require("../../models/EmailCheckToken");
const { default: validator } = require("validator");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Nom d'utilisateur déjà prit" });
    } else {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          return res.status(400).json({ email: "L'adresse Email existe déjà" });
        } else {
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
          });

          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  const emailCheckToken = new EmailCheckToken({
                    user_id: user._id,
                    user_email: user.email,
                    token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                  })
                  emailCheckToken.save().then(token => {
                    Mails.registerEmail(user.email, token.token);
                    res.status(200).json(user)
                  })
                })
                .catch(err => console.log(err));
            });
          });
        }
      })
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "L'adresse email n'existe pas" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          _id: user._id,
          username: user.username,
          email: user.email,
          email_checked: user.email_checked,
          liked_spots: user.liked_spots,
          disliked_spots: user.disliked_spots,
          added_spots: user.added_spots,
          followers: user.followers,
          follows: user.follows,
          password: user.password,
          avatar: user.avatar,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Mot de passe incorrect" });
      }
    });
  });
});

// @route GET api/users/getById
// @desc get user profile with id 
// @access Public
router.get('/getById', (req, res) => {
  User.find({ _id: req.query.user_id }, function (err, user) {
    if (user) {
      res.status(200).send({ user: user[0] })
    } else {
      res.status(400).send(err)
    }
  })
})

// @route POST api/users/updateUser
// @desc update user with user_id
// @access Public
router.post('/updateUser', (req, res) => {
  User.findOneAndUpdate({ _id: req.body.user_id }, req.body.user, { new: true }, function (err, user) {
    if (user) {
      res.status(200).send({ user: user })
    } else {
      res.status(400).send(err)
    }
  })
})

// @route GET api/users/getSearchResults
// @desc get 5 users profiles corresponding to username param
// @access Public
router.get('/getSearchResults', (req, res) => {
  User.find({}, function (err, users) {
    if (users) {
      res.status(200).send({ users: users.filter(user => user.username.toLowerCase().includes(req.query.search.toLowerCase())).slice(0, 5) })
    } else {
      res.status(400).send(err)
    }
  })
})

// @route GET api/users/followUser
// @desc follow user with id of the person following and the id of the followed person
// @access Public 
router.post('/followUser', (req, res) => {
  User.findByIdAndUpdate(req.body.user_id, { $push: { follows: req.body.user_followed_id } }, { 'new': true, useFindAndModify: false }, (err1, user1) => {
    if (user1) {
      User.findByIdAndUpdate(req.body.user_followed_id, { $push: { followers: req.body.user_id } }, { 'new': true, useFindAndModify: false }, (err2, user2) => {
        if (user2) {
          res.status(200).send({ user: user2 })
        } else {
          res.status(400).send({ err2 })
        }
      })
    } else {
      res.status(400).send({ err1 })
    }
  })
})

// @route GET api/users/followUser
// @desc unfollow user with id of the person following and the id of the followed person
// @access Public
router.post('/unfollowUser', (req, res) => {
  User.findByIdAndUpdate(req.body.user_id, { $pull: { follows: req.body.user_followed_id } }, { 'new': true, useFindAndModify: false }, (err1, user1) => {
    if (user1) {
      User.findByIdAndUpdate(req.body.user_followed_id, { $pull: { followers: req.body.user_id } }, { 'new': true, useFindAndModify: false }, (err2, user2) => {
        if (user2) {
          res.status(200).send({ user: user2 })
        } else {
          res.status(400).send({ err2 })
        }
      })
    } else {
      res.status(400).send({ err1 })
    }
  })
})

// @route POST api/users/changeEmail
// @desc change mail of the user
// @access Public
router.post('/changeEmail', (req, res) => {

  // Form validation
  const { errors, isValid } = validateChangeEmail(req.body);

  // Check validation
  if (!isValid) {
    return res.status(200).json(errors);
  }

  User.find({ email: req.body.email }, (err, user) => {
    if (user.length === 0) {
      Mails.changeEmailAddressMail(req.body.oldEmail)
      User.findByIdAndUpdate({ _id: req.body.user_id }, { email: req.body.email }, (err, user) => {
        if (user) {
          return res.status(200).send({ user: user })
        } else {
          return res.status(200).send({ error: err });
        }
      })
    } else {
      res.status(200).send({ email: "l'adresse e-mail existe déjà" })
    }
  })
})

// @route POST api/users/changePassword
// @desc change password of the user
// @access Public
router.post('/changePassword', (req, res) => {
  if (req.body.oldPassword.length === 0) { return res.status(200).send({ oldPassword: "Veuillez indiquer votre ancien mot de passe" }) }
  User.find({ _id: req.body.user_id }, (err, user) => {
    if (user) {

      bcrypt.compare(req.body.oldPassword, user[0].password, function (error, success) {
        if (error) {
          console.log(error)
        } else if (success) {

          const { errors, isValid } = validateChangePassword(req.body);

          // Check validation
          if (!isValid) {
            return res.status(200).json(errors);
          } else {
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
                if (err) throw err;
                User.findByIdAndUpdate({ _id: req.body.user_id }, { password: hash }, (err, user) => {
                  if (err) {
                    return res.status(400).send({ err })
                  } else {
                    Mails.changePasswordMail(req.body.email)
                    return res.status(200).send({ user: user })
                  }
                })
              });
            });
          }
        } else if (!success) {
          res.status(200).send({ oldPassword: "Mot de passe incorrect" })
        }
      })
    } else {
      console.log(err)
    }
  })
  // 
})

module.exports = router;
