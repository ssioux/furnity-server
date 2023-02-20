const { Schema, model, mongoose } = require("mongoose");

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
      picture: {
        type: String,
        required: [true, "Picture is required"],
      },
  
},
{
  timestamps: true,
}
);

const Category = model("Category", categorySchema);
module.exports = Category;