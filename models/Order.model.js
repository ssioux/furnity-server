const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    orderlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Furniture",
      },
    ],
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Order = model("Order", orderSchema);
module.exports = Order;
