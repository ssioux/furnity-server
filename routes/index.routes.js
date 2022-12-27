const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const userRoutes = require("./user.routes");
router.use("/user", userRoutes);

const furnitureRoutes = require("./furniture.routes")
router.use("/furniture", furnitureRoutes)
module.exports = router;
