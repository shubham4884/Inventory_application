const mongoose = require("mongoose");
const Item = require("./Item");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

categorySchema.post("findOneAndDelete", async function (category) {
  if (category.items.length) {
    const res = await Item.deleteMany({ _id: { $in: category.items } });
  }
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
