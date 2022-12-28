const router = require("express").Router();
const { restart } = require("nodemon");
const { isAuthenticated, isAdmin } = require("../middleware/jwt.middleware");
const Order = require("../models/Order.model");

// POST "/order/create" => Creates an Order from the User`s Cart
router.post("/create", async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      order: req.payload.cart,
      client: req.payload._id,
      address: req.payload.address,
    });

    res.status(201).json("Order correctly created");
  } catch (error) {
    next(error);
  }
});
// GET "/order/list" => Order List for the admin
router.get("/list", async (req, res, next) => {
  try {
    const orderList = await Order.find().populate("Furniture");
    res.status(200).json(orderList);
  } catch (error) {
    next(error);
  }
});

// GET "/order/:orderId/details" =>  each order details by id !
router.get("/:orderId/details", async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const orderDetails = await Order.findeBy(orderId);
    res.status(200).json(orderDetails);
  } catch (error) {
    next(error);
  }

});

// PATCH "/order/:orderId/update" => edit the order by id (IF IS NEEDED)
router.patch("/:orderId/update", async (req, res, next) => {
  const { orderId } = req.params;
  const {order, client, state, address} = req.body;
  const orderUpdated = {
    order,
    client,
    state,
    address
  };

  try {
    await Order.findByIdAndUpdate(orderId, orderUpdated)
    restart.status(200).json("Order updated correctly!")
  } catch (error) {
    next(error)
  }
});

// DELETE "/order/:orderId/delete" => Erase the Order by Id!
router.delete("/:orderId/delete", async (req, res, next) => {
    const {orderId}= req.params
    try {
        await Order.findOneAndDelete(orderId)
        res.status().json("Order deleted")
    } catch (error) {
        next(error)
    }
})
module.exports = router;
