const router = require("express").Router();

const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const uploader = require("../middleware/cloudinary.middleware");
const Furniture = require("../models/Furniture.model");
const Category = require("../models/Category.model");

// POST "/furniture/create" => create new furniture
router.post(
  "/create",
  isAuthenticated,
  uploader.single("picture"),
  async (req, res, next) => {
    const {
      name,
      description,
      picture,
      price,
      category,
      onSale,
      salePrice,
      stock,
      units,
    } = req.body;

    try {
        // Validator 1: inputs mast not be empty.
    if (name === "" || description === "" || picture === "" || price === "" || category === "") {
        res.status(400).json({message: "name, description, picture, or price cannot be empty."});
        return;
      }
      // Validator 2: Furniture Name must be unique.
      const response = await Furniture.findOne({ name: name });

      if (response === null) {
        // if the name added doesnt exist in the DB, the creates the Furniture.
        await Furniture.create({
          name: name,
          description: description,
          picture: picture,
          price: price,
          category: category,
          onSale: onSale,
          salePrice: salePrice,
          stock: stock,
          units: units,
        });

        res.status(200).json("Category created");
      } else {
        // if the name exist return Error
        res.status(400).json({ message: "Name already exist." });
        return;
      }

      res.status(200).json("Furniture Created");
    } catch (error) {
      next(error);
    }
  }
);

// GET "/list" => furniture list
router.get("/list", async (req, res, next) => {
  try {
    const response = await Furniture.find();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// GET "furniture/:categoryId/list" => each category furniture furniture list frm DB
router.get("/:categoryId/list", async (req, res, next) => {
  const { categoryId } = req.params
  
  try {
    const eachCategoryFurnitures = await Furniture.find({category: {_id: "6435c697e9a83aadf0c61c98"}}).populate("category");
      
    res.status(200).json(eachCategoryFurnitures);
  } catch (error) {
    next(error);
  }
});

// GET "/furniture/:furnitureId/details"  => furniture details
router.get("/:furnitureId/details", async (req, res, next) => {
  const { furnitureId } = req.params;
  try {
    const details = await Furniture.findById(furnitureId);
    res.status(200).json(details);
  } catch (error) {
    next(error);
  }
});

// PATCH "/furniture/:furnitureId/update" => update furniture
router.patch(
  "/:furnitureId/update",
  isAuthenticated,
  uploader.single("picture"),
  async (req, res, next) => {
    const { furnitureId } = req.params;
    const {
      name,
      description,
      picture,
      price,
      category,
      onSale,
      salePrice,
      stock,
      units,
    } = req.body;
    try {
      await Furniture.findByIdAndUpdate(furnitureId, {
        name: name,
        description: description,
        picture: picture,
        price: price,
        category: category,
        onSale: onSale,
        salePrice: salePrice,
        stock: stock,
        units: units,
      });
      // sending info to client
      res.status(200).json("furniture updated correctly");
    } catch (error) {
      next(error);
    }
  }
);

// DELETE "/furniture/:furnitureId/delete" => delete furniture
router.delete(
  "/:furnitureId/delete",
  isAuthenticated,
  async (req, res, next) => {
    const { furnitureId } = req.params;
    try {
      await Furniture.findByIdAndDelete(furnitureId);
      // sending info to client
      res.status(200).json("furniture deleted");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
