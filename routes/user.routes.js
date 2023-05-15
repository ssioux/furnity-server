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
  const { name, firstName, lastName, cart } = req.body;
  const userUpdated = {
    name: name,
    firstName: firstName,
    lastBane: lastName,
    cart: cart,
  };
  try {
    await User.findByIdAndUpdate(userId, userUpdated);
    res.status(200).json("User Updated successfully!")
  } catch (error) {
    next(error);
  }
});

// DELETE "/user/:userId/delete" => delete the account
router.delete("/:userId/delete", async (req, res, next)=> {
    const {userId}= req.params
    try {
        await User.findByIdAndDelete(userId)
        res.status(200).json("The account has been canceled.")
    } catch (error) {
        next(error)
    }
})

module.exports = router;