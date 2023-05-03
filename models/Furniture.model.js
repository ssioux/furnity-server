const { Schema, model, mongoose } = require("mongoose");

const furnitureSchema = new Schema({
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
  picture: {
    type: String,
    required: [true, "Picture is required"],
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
      required: [true, "Category is required"],
    },
  ],
},
{
  timestamps: true,
}
);

const Furniture = model("Furniture", furnitureSchema);
module.exports = Furniture;
