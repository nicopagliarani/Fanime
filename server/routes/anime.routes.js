const router = require("express").Router();
const Anime = require("../models/Anime.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model")
const axios = require("axios");
const {
  isLoggedIn,
  requireToBeLoggedOut,
} = require("../middlewares/IsLoggedIn");

router.get("/home", isLoggedIn, async (req, res, next) => {
  try {
    const number = Math.floor(Math.random() * 20) + 5;
    const animes = await axios.get(
      `https://kitsu.io/api/edge/anime?page[limit]=${number}`
    );
    const animesData = animes.data.data;
    //console.log(animesData.data);
    res.json({ animesData });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error in fetching animes from server! " + err.message,
    });
  }
});

router.post("/saveFavoriteAnime", async (req, res) => {
  console.log(req.body);
  try{const newAnime = await new Anime({
    canonicalTitle: req.body.canonicalTitle,
    synopsis:req.body.synopsis,
    coverImage: req.body.coverImage,
   });
  await newAnime.save();
  //  console.log(newAnime);
  console.log(req.session.user);
  const userId = req.session.user._id;
  // const userId= '624edb94825a668c62728cc8'
  const user = await User.findById( userId );
  console.log(newAnime._id);
  user.favoriteAnimes.push(newAnime._id);
  await user.save();
  res.json("Favourite Anime added");
}catch (err) {
  console.log(err);
    res.status(400).json({
      errorMessage: "Error in adding to favorites" + err.message,
    });
  }
});

router.get("/showfavoriteAnimes", isLoggedIn, async (req, res) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId ).populate("favoriteAnimes");
  showFavorites = user.favoriteAnimes;
  console.log(showFavorites);
  res.json({ showFavorites });
  return;
});



router.post("/createComment", async (req, res, next) => {
  try {
    const { comment } = req.body;
    console.log("Should create a new comment with", comment);
    const newComment = new Comment({ comment });
    await newComment.save();
    res.json({ message: "Succesfully created comment", comment: newComment });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Please provide correct request body! " + err.message,
    });
  }
});

router.delete("/deleteAnime", async (req, res, next) => {
  console.log(req.body);
  try {
    const {id} = req.body;
    await Anime.findByIdAndDelete(id);
    res.json({ message: "Successfully delete anime " + id});
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Error in deleting anime! " + err.message });
  }
});

module.exports = router;