const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.use(require("./anime.routes"));

router.use(require("./auth.routes"));

module.exports = router;
