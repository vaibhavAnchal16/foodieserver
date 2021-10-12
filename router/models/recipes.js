const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create student schema & model
const RecipeSchema = new Schema({
  name: {
    type: String,
  },
  storeId: {
    type: String,
    required: [true, "Store Id is required"],
  },
  price_online: {
    type: Number,
    // required: [true, "Address field is required"],
  },
  is_available: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
  food_type: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Recipe = mongoose.model("recipe", RecipeSchema);

module.exports = Recipe;
