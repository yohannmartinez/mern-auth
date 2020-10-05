const express = require("express");
const router = express.Router();

// Load Notification model
const EmailCheckToken = require("../../models/EmailCheckToken");
const User = require("../../models/User");

// @route GET api/notifications/getNotificationsNumber
// @desc get number of notifications for a specific user
// @access Public
router.post('/createNewToken', (req, res) => {
  const emailCheckToken = new EmailCheckToken({
    user_id:req.body.user_id,
    user_email:req.body.user_email,
    token:Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),  
  })
  emailCheckToken.save().then(token => res.status(200).send(token))
})


// @route GET api/notifications/getNotificationsNumber
// @desc get number of notifications for a specific user
// @access Public
router.post('/checkToken', (req, res) => {
  EmailCheckToken.findOneAndUpdate({token : req.body.token}, {checked: true}, {new: true}, (err,token)=>{
    console.log(token)
    if(err) {
      res.status(400).send({failure : "problem"})
    } else if (token === null) {
      res.status(200).send({failure : "no token found"})
    } else if (token !== null){
      console.log("token is", token)
      User.findByIdAndUpdate({_id : token.user_id},{email_checked : true}, {new:true},(error,user)=>{
        console.log(user)
        if(err) {
          res.status(400).send({failure : "email not checked"})
        } else {
          res.status(200).send({success : "email checked"})
  
        }
      })
    }
  })
})


module.exports = router;