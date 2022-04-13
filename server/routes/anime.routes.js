const router = require("express").Router();
const Anime = require("../models/Anime.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const axios = require("axios");
const {
  isLoggedIn,
  requireToBeLoggedOut,
} = require("../middlewares/IsLoggedIn");

router.get("/home", async (req, res, next) => {
  try {
    const popularity = await axios.get(
      "https://kitsu.io/api/edge/anime?sort=popularityRank;page[limit]=20"
    );
    const popularityAnime = popularity.data.data;

    const shounen = await axios.get(
      `https://kitsu.io/api/edge/anime?sort=popularityRank;filter[categories]=shounen;page[limit]=20`
    );
    const shounenAnime = shounen.data.data;

    const seinen = await axios.get(
      "https://kitsu.io/api/edge/anime?sort=popularityRank;filter[categories]=seinen;page[limit]=20"
    );
    const seinenAnime = seinen.data.data;

    const shoujo = await axios.get(
      "https://kitsu.io/api/edge/anime?sort=popularityRank;filter[categories]=shoujo;page[limit]=20"
    );
    const shoujoAnime = shoujo.data.data;

    const sports = await axios.get(
      "https://kitsu.io/api/edge/anime?sort=popularityRank;filter[categories]=sports;page[limit]=20"
    );
    const sportsAnime = sports.data.data;

    const isekai = await axios.get(
      "https://kitsu.io/api/edge/anime?sort=popularityRank;filter[categories]=isekai;page[limit]=20"
    );
    const isekaiAnime = isekai.data.data;

    const horror = await axios.get(
      "https://kitsu.io/api/edge/anime?sort=popularityRank;filter[categories]=horror;page[limit]=20"
    );
    const horrorAnime = horror.data.data;

    const crime = await axios.get(
      "https://kitsu.io/api/edge/anime?sort=popularityRank;filter[categories]=crime;page[limit]=20"
    );
    const crimeAnime = crime.data.data;

    res.json({
      popularityAnime,
      shounenAnime,
      seinenAnime,
      shoujoAnime,
      sportsAnime,
      isekaiAnime,
      crimeAnime,
      horrorAnime,
    });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error in fetching animes from server! " + err.message,
    });
  }
});

router.post("/saveFavoriteAnime", async (req, res) => {
  console.log(req.body);
  try {
    const newAnime = await new Anime({
      canonicalTitle: req.body.canonicalTitle,
      synopsis: req.body.synopsis,
      coverImage: req.body.coverImage,
    });
    await newAnime.save();
    //  console.log(newAnime);
    console.log(req.session.user);
    const userId = req.session.user._id;
    // const userId= '624edb94825a668c62728cc8'
    const user = await User.findById(userId);
    console.log(newAnime._id);
    user.favoriteAnimes.push(newAnime._id);
    await user.save();
    res.json("Favourite Anime added");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errorMessage: "Error in adding to favorites" + err.message,
    });
  }
});

router.get("/showfavoriteAnimes", async (req, res) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favoriteAnimes");
  showFavorites = user.favoriteAnimes;
  console.log(showFavorites);
  res.json({ showFavorites });
  return;
});

router.post("/createComment", isLoggedIn, async (req, res, next) => {
  console.log(req.body);
  try {
    const comment = new Comment({
      name: req.body.name,
      comment: req.body.comment,
      animeName: req.body.animeName,
    });
    console.log("Should create a new comment with", comment);
    await comment.save();
    console.log(req.session.user);
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    console.log(comment._id);
    user.comment.push(comment._id);
    await user.save();
    res.json({ message: "Succesfully created comment", comment });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Please provide correct request body! " + err.message,
    });
  }
});
router.get("/getComments/:animeName", isLoggedIn, async (req, res) => {
  animeName = req.params.animeName;
  console.log(animeName, "This are the anime name");
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("comment");
  // console.log(user.comment, "User comment is here")
  showComments = user.comment.filter((element) => {
    return element.animeName == animeName;
  });
  console.log(showComments);
  res.json({ showComments });
  return;
});
router.get("/search/:anime", async (req, res, next) => {
  const {
    data: { data },
  } = await axios.get(
    `https://kitsu.io/api/edge/anime?filter[text]=${req.params.anime}`
  );
  console.log(data);
  res.json(data);
});

router.delete("/deleteAnime/:id", async (req, res, next) => {
  console.log(req.body);
  try {
    const id = req.params.id;
    await Anime.findByIdAndDelete(id);
    res.json({ message: "Successfully delete anime " + id });
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Error in deleting anime! " + err.message });
  }
  console.log(req.body);
});

module.exports = router;
