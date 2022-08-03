const Category = require("../models/Category");
const Item = require("../models/Item");

// Display a list of all categories
exports.category_list = function (req, res) {
  Category.find(function (err, data) {
    if (err) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(200).render("index", { categories: data });
    }
  });
};

// Display detail page for a specific category
exports.category_detail = async function (req, res) {
  const { id } = req.params;
  const category = await Category.findById(id).populate("items");
  res.render("category", { category });
};

// Display Category create form on GET
exports.category_create_get = function (req, res) {
  const previousURL = req.headers.referer;
  res.render("category_form", { previousURL: previousURL });
};

// Handle Category create on POST
exports.category_create_post = function (req, res) {
  const { name, description } = req.body;

  if (!name || !description) {
    res.send("missing required fields");
  } else {
    const category = new Category({
      name,
      description,
    });

    category.save().then((result) => {
      res.redirect("/");
    });
  }
};

// Display Category edit form on GET
exports.category_edit_get = function (req, res) {
  const categoryId = req.params.id;
  Category.findOne({ _id: categoryId }, function (err, data) {
    if (!data) {
      res.status(404).send("No category with that id exists");
    } else {
      res.status(200).render("category_edit", { category: data });
    }
  });
};

// Handle Category update on PUT
exports.category_edit_put = function (req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  Category.findOneAndUpdate(
    { _id: id },
    { $set: { name, description } },
    { new: true },
    function (err, data) {
      if (!data) {
        res.status(404).json("No category with that id exists");
      } else {
        res.status(200).redirect("/");
      }
    }
  );
};

// Display delete Category page
exports.category_get_delete = function (req, res) {
  const { id } = req.params;
  Category.findOne({ _id: id }, function (err, data) {
    if (!data) {
      res.status(404).json("No category with that id exists");
    } else {
      res.render("category_delete", { id: id, category: data });
    }
  });
};

// Delete Category
exports.category_delete = function (req, res) {
  const { id } = req.params;
  Category.findByIdAndDelete(id, function (err, data) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).redirect("/");
    }
  });
};
