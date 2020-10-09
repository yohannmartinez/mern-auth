const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const Spot = require("../../models/Spot");

// @route POST api/spots/add
// @desc Add spot
// @access Public
router.post("/add", (req, res) => {
  const newSpot = new Spot({
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    name: req.body.name,
    type: req.body.type,
    added_by: req.body.added_by,
    added_timestamp: req.body.added_timestamp,
    is_indoor: req.body.isIndoor,
    description: req.body.description,
    size: req.body.size,
  })
  newSpot.save().then(spot => res.status(200).send({ spot: spot }))
    .catch(err => console.log(err));
});

// @route GET api/spots/getAll
// @desc Get all spots
// @access Public
router.get("/getAll", (req, res) => {
  Spot.find({},function(err,spots){
    if(spots) {
      res.status(200).send({ spots : spots })
    } else {
      res.status(400).send(err)
    }
  })
});

// @route GET api/spots/getAddedSpotsByUserId
// @desc Get all spots added by a user
// @access Public
router.get("/getAddedSpotsByUserId", (req, res) => {
  Spot.find({added_by : req.query.user_id},function(err,spots){
    if(spots) {
      res.status(200).send({ spots : spots })
    } else {
      res.status(400).send(err)
    }
  })
});

// @route GET api/spots/getSpotById
// @desc Get spot by spot_id
// @access Public
router.get("/getSpotById", (req, res) => {
  Spot.find({_id : req.query.spot_id},function(err,spot){
    if(err) {
      res.status(200).send({ failure : err })
    } else if(spot){
      res.status(200).send({ spot : spot })
    }else if(!spot) {
      res.status(200).send({ failure : null })
    }
  })
});


// @route POST api/spots/updateSpot
// @desc update spot with spot_id
// @access Public
router.post('/updateSpot', (req, res) => {
  Spot.findOneAndUpdate({ _id: req.body.spot_id }, req.body.spot,{new:true}, function (err, spot) {
    if (spot) {
      res.status(200).send({ spot: spot })
    } else {
      res.status(400).send(err)
    }
  })
})




module.exports = router;
