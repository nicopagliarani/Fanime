// POST route for saving a user image in the database
// This route has the image upload example
const router = require("express").Router();
const fileUploader = require("../config/cloudinary");
const User = require("../models/User.model");

router.post("/upload", fileUploader.single("imageUrl"), (req, res) => {
  let userId = req.session.user._id;
  let newImage = req.file.path;
  console.log("the image is here!", req.file, userId);
  User.findByIdAndUpdate(userId, { imageUrl: newImage })
    .then((updatedUser) => {})
    .catch((error) =>
      console.log(`Error while creating a new movie: ${error}`)
    );
  User.findById(userId).then((userFromDb) => {
    console.log("userFromDB =>", userFromDb);
    res.status(200).json(userFromDb);
  });
});

module.exports = router;
