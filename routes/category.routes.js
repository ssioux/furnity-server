const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const uploader = require("../middleware/cloudinary.middleware");

const Category = require("../models/Category.model");

console.log("entrando a category");
// POST ("/category/create") => create new Category
router.post(
  "/create",
  isAuthenticated,
  uploader.single("picture"),
  async (req, res, next) => {
    console.log(
      "first - entrando en crear categoria ----------------------------------"
    );

    const { name, description, picture } = req.body;

    if (name === "" || description === "" || picture === "") {
      res.status(400).json("name, description or image cannot be empty.");
    }

    try {
      const response = await Category.findOne({ name: name });
      console.log("🚀 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~:", response)
      

      if (response === null) {
        await Category.create({
          name: name,
          description: description,
          picture: picture,
        });
        res.status(200).json("Category created");
      } else {
        res.status(400).json({ message: "Name already exist." });
      }
    } catch (error) {
      next(error);
    }
  }
);

// GET ("/category/list") => List of Categories
router.get("/list", async (req, res, next) => {
  try {
    const response = await Category.find();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// GET ("/category/:categoryId/details") => Category details
router.get("/:categoryId/details", async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const response = await Category.findById(categoryId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// PATCH ("/category/:categoryId/update") => Update Category
router.patch(
  "/:categoryId/update",
  isAuthenticated,
  uploader.single("image"),
  async (req, res, next) => {
    const { categoryId } = req.params;
    const { name, description, image } = req.body;

    try {
      await Category.findByIdAndUpdate(categoryId, {
        name: name,
        description: description,
        image: image,
      });

      // sending info to client
      res.status(200).json("Category updated correctly");
    } catch (error) {
      next(error);
    }
  }
);

// DELETE "/category/:categoryId/delete" => delete category
router.delete(
  "/:categoryId/delete",
  isAuthenticated,
  async (req, res, next) => {
    const { categoryId } = req.params;
    try {
      await Category.findByIdAndDelete(categoryId);
      // sending info to client
      res.status(200).json("Category deleted");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
