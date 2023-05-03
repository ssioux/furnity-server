const router = require("express").Router()

const {isAuthenticated} = require("../middleware/jwt.middleware.js")
const uploader = require("../middleware/cloudinary.middleware")
const Furniture = require("../models/Furniture.model")

// POST "/furniture/create" => create new furniture
router.post("/create", 
isAuthenticated,
uploader.single("image"),
async(req,res,next) =>{
const {name, description,image, price, category,onSale,salePrice,stock,units} = req.body;
console.log("req.body", req.body)
try {
     await Furniture.create({
        name: name,
        description: description,
        image: image,
        price: price,
        category:category,
        onSale: onSale,
        salePrice: salePrice,
        stock: stock,
        units: units,

    })

    res.status(200).json("Furniture Created");
    
} catch (error) {
   next(error) 
}
})

// GET "/list" => furniture list
router.get("/list", async (req,res,next) => {
    try {
        const response = await Furniture.find()
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
})

// GET "/furniture/:furnitureId/details"  => furniture details
router.get("/:furnitureId/details", async(req,res,next) => {
    const{furnitureId} = req.params;
    try {
        const details = await Furniture.findById(furnitureId)
        res.status(200).json(details)

    } catch (error) {
        next(error)
    }
})

// PATCH "/furniture/:furnitureId/update" => update furniture
router.patch("/:furnitureId/update",
isAuthenticated,
uploader.single("picture"),
async(req,res,next) => {
    const {furnitureId} = req.params;
    const {name, description,picture, price, category, onSale, salePrice, stock, units } = req.body;
      try {
        await Furniture.findByIdAndUpdate(furnitureId, {
            name: name,
            description: description,
            picture: picture,
            price: price,
            category:category,
            onSale: onSale,
            salePrice: salePrice,
            stock: stock,
            units: units,   
        })
        // sending info to client
        res.status(200).json("furniture updated correctly")
      } catch (error) {
        next(error)
      }
});

// DELETE "/furniture/:furnitureId/delete" => delete furniture
router.delete("/:furnitureId/delete",
isAuthenticated,
async(req,res,next) =>{
    const{furnitureId} = req.params;
    try {
        await Furniture.findByIdAndDelete(furnitureId)
    // sending info to client
    res.status(200).json("furniture deleted");
    } catch (error) {
        next(error)
    }
}
);

module.exports = router

