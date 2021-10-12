const express = require("express");
const Recipe = require("./models/recipes");
const Restaurant = require("./models/restaurant");
const User = require("./models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/restaurants", function (req, res, next) {
  Restaurant.find({})
    .then(function (restaurants) {
      res.send(restaurants);
    })
    .catch(next);
});

router.post("/restaurants", function (req, res, next) {
  Restaurant.create(req.body)
    .then(function (restau) {
      res.send(restau);
    })
    .catch(next);
});

router.get("/recipes/:storeId", function (req, res, next) {
  const { storeId } = req.params;
  Recipe.find({ storeId })
    .then(function (recipes) {
      res.send(recipes);
    })
    .catch(next);
});

router.get("/search/:searchkey", function (req, res, next) {
  const { searchkey } = req.params;
  Restaurant.find({
    $or: [
      { name: { $regex: searchkey, $options: "i" } },
      { restaddress: { $regex: searchkey, $options: "i" } },
    ],
  })
    .then(function (results) {
      res.send(results);
    })
    .catch(next);
});

router.post("/recipes", function (req, res, next) {
  Recipe.create(req.body)
    .then(function (recip) {
      res.send(recip);
    })
    .catch(next);
});

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    var encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "72h",
      }
    );
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "72h",
        }
      );
      user.token = token;
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

router.put("/updaterecipe/:id", function (req, res, next) {
  Recipe.findOneAndUpdate({ _id: req.params.id }, req.body).then(function (
    recipe
  ) {
    Recipe.findOne({ _id: req.params.id }).then(function (recip) {
      res.send(recip);
    });
  });
});

router.delete("/deleterecipe/:id", function (req, res) {
  Recipe.findOneAndDelete({ _id: req.params.id }).then(function (recip) {
    res.send(recip);
  });
});

module.exports = router;
