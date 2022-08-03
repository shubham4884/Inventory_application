const Category = require("../models/Category");
const Item = require("../models/Item");

// Display Item create form on GET
exports.item_create_get = function (req, res) {
  const { id } = req.params;
  const previousURL = req.headers.referer;
  res.render("item_form", { id: id, previousURL: previousURL });
};

// Handle Item create on POST
exports.item_create_post = async function (req, res) {
  const { id } = req.params;
  const { name, description, price, number_in_stock } = req.body;
  const categorySchema = await Category.findById(id);

  if (!name || !description) {
    res.send("missing required fields");
  } else {
    const item = new Item({
      name,
      description,
      price,
      number_in_stock,
    });
    categorySchema.items.push(item);
    item.category = categorySchema;
    await categorySchema.save();
    await item.save().then((result) => {
      res.redirect(`/category/${id}`);
    });
  }
};

// Display Item edit form on GET
exports.item_edit_get = async function (req, res) {
  const { categoryId, id } = req.params;
  const item = await Item.findById(id);
  const previousURL = req.headers.referer;
  res.render("item_edit", {
    item: item,
    categoryId: categoryId,
    previousURL: previousURL,
  });
};

// Handle Item update on PUT
exports.item_edit_put = function (req, res) {
  const { name, description, price, number_in_stock } = req.body;
  const { categoryId, id } = req.params;
  Item.findOneAndUpdate(
    { _id: id },
    { $set: { name, description, price, number_in_stock } },
    { new: true },
    function (err, data) {
      if (!data) {
        res.status(404).json("No item with that id exist");
      } else {
        res.redirect(`/category/${categoryId}`);
      }
    }
  );
};

// Display Item delete page
exports.item_delete_get = async function (req, res) {
  const { categoryId, id } = req.params;
  const item = await Item.findById(id);
  res.render("item_delete", { item: item, categoryId: categoryId });
};

// Handle delete item
exports.item_delete_post = function (req, res) {
  const { categoryId, id } = req.params;
  Item.findByIdAndDelete(id, function (err, data) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.redirect(`/category/${categoryId}/`);
    }
  });
};
