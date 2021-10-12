require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
// set up our express app
const app = express();
// connect to mongodb
// CORS
app.use(cors());
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;
app.use(express.static("public"));
app.use(express.json());
// initialize routes
app.use("/api", require("./router/api"));
// error handling middleware
app.use(function (err, req, res, next) {
  //console.log(err);
  res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(process.env.port || 4000, function () {
  console.log("Ready to Go!");
});
