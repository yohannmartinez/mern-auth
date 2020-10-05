const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

// Load Notification model
const Notif = require("../../models/Notification");
const User = require("../../models/User");

// @route GET api/notifications/getNotificationsNumber
// @desc get number of notifications for a specific user
// @access Public
router.get('/getNewNotificationsNumber', (req, res) => {
  Notif.countDocuments({ targeted_user_id: req.query.user_id, checked_status: false }, function (err, number) {
    if (err) {
      res.status(200).send(err)

    } else {
      res.status(200).send({ notifications_number: number })
    }
  })
})

// @route GET api/notifications/getNotificationsNumber
// @desc get number of notifications for a specific user
// @access Public
router.get('/getNotifications', (req, res) => {
  Notif.find({ targeted_user_id: req.query.user_id }).exec(function (err, notifications) {
    console.log("response is", notifications, req.query.user_id)
    if (!err) {
      res.status(200).send({ notifications: notifications })
    } else {
      res.status(200).send(err)
    }
  })
})

// @route GET api/notifications/getNotificationsNumber
// @desc get number of notifications for a specific user
// @access Public
router.post('/setNotificationsToChecked', (req, res) => {
  Notif.updateMany({ targeted_user_id: req.body.user_id }, { checked_status: true }, function (err, notifications) {
    console.log("response is", notifications, req.query.user_id)
    if (!err) {
      res.status(200).send({ notifications: notifications })
    } else {
      res.status(200).send(err)
    }
  })
})

// @route GET api/notifications/getNotificationsNumber
// @desc get number of notifications for a specific user
// @access Public
router.post('/createOne', (req, res) => {
  if (req.body.libelle === "follow") {
    console.log("following notification")
    Notif.find({ libelle: "follow", checked_status: false, targeted_user_id: req.body.targeted_user_id, transmitter_user_id: req.body.transmitter_user_id }, function (err, notif) {
      console.log("notif is", notif)
      if (notif.length === 0) {
        console.log("notif doesnt exist")
        const newNotification = new Notif({
          targeted_user_id: req.body.targeted_user_id,
          transmitter_user_id: req.body.transmitter_user_id,
          attachment: req.body.attachment,
          libelle: req.body.libelle,
          content: req.body.content,
          checked_status: false,
          date: req.body.date,
        });
        newNotification.save().then(notification => res.status(200).send({ notification: notification })).catch(err => console.log(err));
      } else {
        console.log("notif exist")
        res.status(200).send({ notification: {} })
      }
    })
  } else if (req.body.libelle === "like/dislike") {
    console.log("following notification")
    Notif.find({ libelle: "like/dislike", checked_status: false, targeted_user_id: req.body.targeted_user_id, attachment: req.body.attachment }, function (err, notif) {
      console.log("notif is", notif)
      if (notif.length === 0) {
        console.log("notif doesnt exist")
        const newNotification = new Notif({
          targeted_user_id: req.body.targeted_user_id,
          transmitter_user_id: req.body.transmitter_user_id,
          attachment: req.body.attachment,
          libelle: req.body.libelle,
          content: req.body.content,
          checked_status: false,
          date: req.body.date,
        });
        newNotification.save().then(notification => res.status(200).send({ notification: notification })).catch(err => console.log(err));
      } else {
        console.log('notif already exist')
        Notif.findOneAndUpdate({ libelle: "like/dislike", checked_status: false, targeted_user_id: req.body.targeted_user_id }, { content: req.body.content, date: req.body.date, transmitter_user_id: req.body.transmitter_user_id }, function (err, notif) {
          console.log("new notif is", notif)
          res.status(200).send({ notification: {} })
        })

      }
    })
  } else if (req.body.libelle === "add_spot") {
    const newNotification = new Notif({
      targeted_user_id: req.body.targeted_user_id,
      transmitter_user_id: req.body.transmitter_user_id,
      attachment: req.body.attachment,
      libelle: req.body.libelle,
      content: req.body.content,
      checked_status: false,
      date: req.body.date,
    });
    newNotification.save().then(notification => res.status(200).send({ notification: notification })).catch(err => console.log(err));
  } else if (req.body.libelle === "add_review") {
    Notif.find({ libelle: "add_review", checked_status: false, targeted_user_id: req.body.targeted_user_id, transmitter_user_id: req.body.transmitter_user_id, attachment: req.body.attachment }, function (err, notif) {
      if (notif.length === 0) {
        console.log("notif doesnt exist")
        const newNotification = new Notif({
          targeted_user_id: req.body.targeted_user_id,
          transmitter_user_id: req.body.transmitter_user_id,
          attachment: req.body.attachment,
          libelle: req.body.libelle,
          content: req.body.content,
          checked_status: false,
          date: req.body.date,
        });
        newNotification.save().then(notification => res.status(200).send({ notification: notification })).catch(err => console.log(err));
      }
    })
  }

})

// router.post('/createLikeSpotNotification', (req, res) => {
//   //check si la notif n'existe pas déjà à cause de user qui s'amuse à like dislike les gens (check notif libelle "like" && target && transmitter)
//   const newNotification = new Notif({
//     targeted_user_id: req.body.targeted_user_id,
//     transmitter_user_id: req.body.transmitter_user_id,
//     attachment: req.body.attachment,
//     libelle: "like_spot",
//     content: "à aimé votre spot",
//     checked_status: false,
//     date: req.body.date,
//   });
//   newNotification.save().then(notification => res.status(200).send({ notification: notification })).catch(err => console.log(err));
// })

// router.post('/createFollowNotification', (req, res) => {

//   //check si la notif n'existe pas déjà à cause de user qui s'amuse à follow unfollow les gens (check notif libelle "follow" && target && transmitter)
//   const newNotification = new Notif({
//     targeted_user_id: req.body.targeted_user_id,
//     transmitter_user_id: req.body.transmitter_user_id,
//     attachment: req.body.attachment,
//     libelle: req.body.libelle,
//     content: req.body.content,
//     checked_status: false,
//     date: req.body.date,
//   });
//   newNotification.save().then(notification => res.status(200).send({ notification: notification })).catch(err => console.log(err));
// })

// router.post('/createAddReviewNotification', (req, res) => {

//   //check si la notif n'existe pas déjà à cause de user qui s'amuse à follow unfollow les gens (check notif libelle "follow" && target && transmitter)
//   const newNotification = new Notif({
//     targeted_user_id: req.body.targeted_user_id,
//     transmitter_user_id: req.body.transmitter_user_id,
//     attachment: req.body.attachment,
//     libelle: req.body.libelle,
//     content: req.body.content,
//     checked_status: false,
//     date: req.body.date,
//   });
//   newNotification.save().then(notification => res.status(200).send({ notification: notification })).catch(err => console.log(err));
// })

module.exports = router;
