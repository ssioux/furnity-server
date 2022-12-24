const { Schema, model } = require("mongoose");

const addressSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    street: {
      type: String,
      trim: true,
      required: [true, "Street is required"],
    },
    number: {
      type: String,
      required: [true, "Number is required"],
      trim: true,
    },
    cp: {
      type: Number,
      required: [true, "cp is required"],
      trim: true,
    },
    town: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    province: {
      type: String,
      required: [true, "Province is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Address = model("Address", addressSchema);
module.exports = Address;
