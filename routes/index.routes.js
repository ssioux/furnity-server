const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const userRoutes = require("./user.routes");
router.use("/user", userRoutes);

const furnitureRoutes = require("./furniture.routes");
router.use("/furniture", furnitureRoutes);

const orderRoutes = require("./order.routes");
router.use("/order", orderRoutes);

const addressRoutes = require("./address.routes");
router.use("/address", addressRoutes);

module.exports = router;
