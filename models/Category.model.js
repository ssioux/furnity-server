const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        unique: true,
        trim: true,
      },
      description: {
        type: String,        
        trim: true,
      },
      image: {
        type: String,
        required: [true, "image is required"],
      },
  
});

const Category = model("Category", categorySchema);
module.exports = Category;