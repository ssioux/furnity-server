// Express Import
const router = require("express").Router();

// Role & Auth Validators
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { isAdmin } = require("../middleware/role.middleware");
// Model from DB
const Address = require("../models/Address.model");
const User = require("../models/User.model");

// POST "/address/create" => Creates a New Address in DB
router.post("/create", async (req, res, next) => {
  const { street, number, stair, letter, cp, town, province, country } =
    req.body;
  const newAddress = {
    street,
    number,
    stair,
    letter,
    cp,
    town,
    province,
    country,
  };

  try {
    const currentAddress = await Address.create(newAddress);
    await User.findByIdAndUpdate(req.payload._id, {$addToset: {address: currentAddress}})
    // console.log("🚀 ~ file: address.routes.js:29 ~ router.post ~ currentUser", currentUser)
    
    res.status(200).json("Address Created and address added to current user, correctly!");
  
} catch (error) {
    next(error);
  }
});

// GET "/address/ownlist" => Address ownList (User Address List)
// router.get("/ownlist")

// GET "/address/:addressId/details" => Address Details!
router.get("/:addressId/details", async (req, res, next) => {
  const { addressId } = req.params;
  try {
    const addressDetails = await Address.findById(addressId);
    res.status(200).json(addressDetails);
  } catch (error) {
    next(error);
  }
});

// PATCH "/address/:addressId/update" => Addres Update!
router.patch("/:addressId/update", async (req, res, next) => {
  const { addressId } = req.params;
  const { street, number, stair, letter, cp, town, province, country } = req.body;
  const addressUpdate = {
    street,
    number,
    stair,
    letter,
    cp,
    town,
    province,
    country,
}

try {
    await Address.findByIdAndUpdate(addressId, addressUpdate)
    res.status(200).json("Address Updated Correctly!")
} catch (error) {
    next(error)
}

});

// DELETE "/address/:addressId/delete" => Erasing Address from DB!
router.delete("/:addressId/delete", async ( req, res, next) => {
    const {addressId} = req.params
    try {
        await Address.findByIdAndDelete(addressId)
        res.status(200).json("Address deleted!")
    } catch (error) {
        next(error)
    }
}) 

module.exports = router;
