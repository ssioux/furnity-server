const cloudinary = require("cloudinary").v2
const multer = require("multer")
const {CloudinaryStorage} = require("multer-storage-cloudinary")

// * Send Credentials to Cloudinary.
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET

})

// * Bundle Config
const storage = new CloudinaryStorage({
    cloudinary,
    paramas:{
        allowedFormats: ["jpg", "png","jpeg","svg"],
        folder: "furnity-app"
    }
});

const uploader = multer({
    storage
})

module.exports = uploader;