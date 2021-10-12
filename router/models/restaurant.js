const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create student schema & model
const RestaurantSchema = new Schema({
  name: {
    type: String,
  },
  restaddress: {
    type: String,
    // required: [true, "Address field is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Restaurant = mongoose.model("restaurant", RestaurantSchema);

module.exports = Restaurant;
