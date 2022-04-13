const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const axios = require("axios");
const {
  isLoggedIn,
  requireToBeLoggedOut,
} = require("../middlewares/IsLoggedIn");

router.post("/login", async (req, res, next) => {
  try {
    console.log("req.body :", req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw Error();
    }
    const samePassword = await bcrypt.compare(password, user.password);
    if (!samePassword) {
      throw Error();
    }
    const sessionUser = { username: user.username, _id: user._id };
    req.session.user = sessionUser;
    console.log(req.session);
    return res.json({ message: "Successfully logged in!", user: sessionUser });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errorMessage: "Wrong password or username" });
  }
});

router.post("/signup", requireToBeLoggedOut, async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const alreadyHaveUserName = await User.findOne({ username });
    if (alreadyHaveUserName) {
      return res.status(400).json({ errorMessage: "User name already use" });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await new User({ username, password: passwordHash });
    await user.save();
    return res.json({ message: "Correctly login" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: "Something went wrong" });
  }
});

router.post("/logout", isLoggedIn, async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    return res.json({ message: "You are Logged Out" });
  });
});

router.get("/verify", async (req, res, next) => {
  if (req.session.user) {
    const user = req.session.user;
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

    res.json({
      popularityAnime,
      shounenAnime,
      seinenAnime,
      shoujoAnime,
      sportsAnime,
      user,
    });
  } else {
    return res.json(null);
  }
});
module.exports = router;
//
