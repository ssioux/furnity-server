const router = require("express").Router();
const {isAuthenticated} = require("../middleware/jwt.middleware");
const uploader = require("../middleware/cloudinary.middleware");

const Category = require("../models/Category.model");

// POST ("/category/create") => create new Category
router.post("/create", 
isAuthenticated,
uploader.single("image"),
async (req,res,next) => {
    const {name, description, image} = req.body;
    try {
        const response = await Category.create({
            name:name,
            description: description,
            image: image
        });
        res.status(200).json("Category created")
    } catch (error) {
        next(error)
    }
}
);

// GET ("/category/list") => List of Categories
router.get("/list",async(req,res,next) => {
    try {
        const response = await Category.find() 
        res.status(200).json(response)
    } catch (error) {
        next(error) 
    }
});

// GET ("/category/:categoryId/details") => Category details
router.get("/:categoryId/details", async(req,res,next) => {
    const {categoryId} = req.params
    try {
        const response = await Category.findById(categoryId)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

// PATCH ("/category/:categoryId/update") => Update Category
router.patch("/:categoryId/update",
isAuthenticated,
uploader.single("image"),
async (req,res,next) => {
    const {categoryId} = req.params
    const {name, description,image} = req.body
    try {
        await Category.findByIdAndUpdate(categoryId,{
            name: name,
            description: description,
            image: image
        })
        // sending info to client
        res.status(200).json("Category updated correctly")
    } catch (error) {
        next(error)
    }
}
)

module.exports = router;