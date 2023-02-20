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

const categoryRoutes = require("./category.routes");
router.use("/category", categoryRoutes);

const addressRoutes = require("./address.routes");
router.use("/address", addressRoutes);

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

console.log("entrando a index")

module.exports = router;
