const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config()
const passport = require("passport");

const users = require("./routes/api/users");
const spots = require("./routes/api/spots");
const notifications = require("./routes/api/notifications");
const emailCheckTokens = require("./routes/api/emailCheckTokens");
const forgotPasswordTokens = require("./routes/api/forgotPasswordTokens");
const s3 = require("./routes/api/s3");
const path = require("path");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client/build")))

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/spots", spots);
app.use("/api/notifications", notifications);
app.use("/api/emailCheckTokens", emailCheckTokens);
app.use("/api/forgotPasswordTokens", forgotPasswordTokens);
app.use("/api/s3", s3);

console.log(process.env.TEST)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
