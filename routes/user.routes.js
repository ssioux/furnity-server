const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");

// GET "/user/list" => User List from DB
router.get("/list", async (req, res, next) => {
  try {
    const userList = await User.find();
    res.status(200).json(userList);
  } catch (error) {
    next(error);
  }
});

// GET "/user/user-cart" => User Cart List from DB
router.get("/user-cart", isAuthenticated, async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.payload._id).populate("cart");
    res.status(200).json(currentUser.cart);
  } catch (error) {
    next(error);
  }
});

// GET "/user/:userId/details" => User(id) details
router.get("/:userId/details", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userDetails = await User.findById(userId);
    res.status(200).json(userDetails);
  } catch (error) {
    next(error);
  }
});

// PATCH "/user/:userId/edit" => Edit User by id in the DB
router.patch("/:userId/update", async (req, res, next) => {
  const { userId } = req.params;

  const { name, firstName, lastName } = req.body;

  const userUpdated = {
    name: name,
    firstName: firstName,
    lastName: lastName,
  };
  try {
    await User.findByIdAndUpdate(userId, userUpdated);
    res.status(200).json("User Updated successfully!");
  } catch (error) {
    next(error);
  }
});

// PATCH "/user/addtocart" => Edit User by id in the DB adding item to cart
router.patch("/addtocart", isAuthenticated, async (req, res, next) => {
  const { furnyId } = req.body;

  try {
     await User.findByIdAndUpdate(req.payload._id, {
      $addToSet: { cart: furnyId }
    });
 
    res.status(200).json("Item added Correctly!");
  } catch (error) {
    next(error);
  }
});

// DELETE "/user/:userId/removetocart" => Edit User by id in the DB removing item from the user cart
router.patch("/removefromcart",isAuthenticated, async (req, res, next) => {

  const { furnyId } = req.body;

  try {
    await User.findByIdAndUpdate(req.payload._id, { $pull: { cart: furnyId } });
    res.status(200).json("Item erased Correctly!");
  } catch (error) {
    next(error);
  }
});

// DELETE "/user/:userId/delete" => delete the account
router.delete("/:userId/delete", async (req, res, next) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json("The account has been canceled.");
  } catch (error) {
    next(error);
  }
});

// PATCH "/user/add-unit" => One more Item added to cart item
router.patch("/add-unit", isAuthenticated, async (req, res, next) => {
  const { furnyId } = req.body;

  try {
     await User.findByIdAndUpdate(req.payload._id, {
      $addToSet: { cart: furnyId }
    });
 
    res.status(200).json("One more Item added");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
