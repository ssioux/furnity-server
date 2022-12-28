const router = require("express").Router();
// This route exist only for receive an image, bring to cloudinary and send the URL to the FE

const uploader = require("../middleware/cloudinary.middleware")

router.post("/", uploader.single("image"), (req,res,next) => {
    if(req.file === undefined) {
        res.status(400).json("Issues uploading the image");
        return
    }
    // Cloudinary URL
    res.status(200).json({image:req.file.path})
});

module.exports = router;