const { Schema, model } = require("mongoose");

const furnitureSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      trim: true,
    },
    onSale: Boolean,
    salePrice: Number,
    stock: Boolean,
    units: Number,
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Furniture = model("Furniture", furnitureSchema);
module.exports = Furniture;
