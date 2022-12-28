const { Schema, model, mongoose } = require("mongoose");

const orderSchema = new Schema(
  {
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Furniture",
      },
    ],
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    state: {
      type: String,
      enum: ["Pending", "In progress", "Delivered"],
      default: "Pending"
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  {
    timestamps: true,
  }
);
const Order = model("Order", orderSchema);
module.exports = Order;
