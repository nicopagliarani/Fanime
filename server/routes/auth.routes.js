const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

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
    req.session.user = { username: user.username, _id: user._id };
    return res.json({ message: "Nice you are logged in" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errorMessage: "Something went wrong!" });
  }
});

router.post("/signup", async (req, res, next) => {
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

module.exports = router;
