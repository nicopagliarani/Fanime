const router = require("express").Router();
const Anime = require("../models/Anime.model");
const User = require("../models/User.model");
const axios = require("axios");


router.get("/anime", async (req, res, next) => {
  try {
    const animes =  await axios.get(
"https://kitsu.io/api/edge/anime/"
    );
    const animesData= animes.data
    res.json({animesData});
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error in fetching animes from server! " + err.message,
    });
  }
});

router.post("/anime", async (req, res) => {
  const newAnime = new Anime({
    canonicalTitle: req.body.canonicalTitle,
    synopsis:req.body.synopsis,
    coverImage: req.body.coverImage,
   });
   await newAnime.save();
  const userId = req.session.currentUser._id;
  const user = await User.findById({ _id: userId });
  console.log(newAnime._id);
  user.favoriteAnimes.push(newAnime._id);
  await user.save();
  res.json("Favourite Anime added");
});

// router.post("/anime", async (req, res, next) => {
//   try {
//     const {  canonicalTitle,  synopsis } = req.body;
//     console.log("Should create a new anime with", canonicalTitle,  synopsis);
//     const newAnime = new Anime({ canonicalTitle,  synopsis });
//     await newAnime.save();
//     res.json({ message: "Succesfully created anime", anime: newAnime });
//   } catch (err) {
//     res.status(400).json({
//       errorMessage: "Please provide correct request body! " + err.message,
//     });
//   }
// });

router.delete("/anime", async (req, res, next) => {
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