const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  price: {
    type: Number,
    required: true,
  },
  number_in_stock: {
    type: Number,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
