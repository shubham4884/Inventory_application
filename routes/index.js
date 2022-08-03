const express = require("express");
const router = express.Router();

// Require controller modules
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

/// CATEGORY ROUTES ///

// GET all categories
router.get("/", category_controller.category_list);

// GET request for specific category page
router.get("/category/:id", category_controller.category_detail);

// GET request for creating Category
router.get("/new-category", category_controller.category_create_get);

// POST request for creating Category
router.post("/new-category", category_controller.category_create_post);

// GET request for editing Category
router.get("/category/:id/edit", category_controller.category_edit_get);

// POST request for editing Category
router.post("/category/:id/edit", category_controller.category_edit_put);

// GET request for deleting Category
router.get("/category/:id/delete", category_controller.category_get_delete);

// DELETE request for deleting Category
router.post("/category/:id/delete", category_controller.category_delete);

/// ITEM ROUTES ///

// GET request for creating Item
router.get("/category/:id/new-item", item_controller.item_create_get);

// POST request for creating Item
router.post("/category/:id/new-item", item_controller.item_create_post);

// GET request for editing item
router.get("/category/:categoryId/:id/edit", item_controller.item_edit_get);

// POST request for editing item
router.post("/category/:categoryId/:id/edit", item_controller.item_edit_put);

// GET request for deleting item
router.get("/category/:categoryId/:id/delete", item_controller.item_delete_get);

// POST request for deleting item
router.post("/category/:categoryId/:id/delete", item_controller.item_delete_post);

module.exports = router;
