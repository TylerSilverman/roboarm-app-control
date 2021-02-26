const router = require("express").Router();
const { Favorites } = require("../models");

router.get("/favorites", async (req, res) => {
  try {
    const favoritesMotions = await Favorites.find({});
    res.json(favoritesMotions);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post("/favorites", async (req, res) => {
  try {
    const newFavorite = await Favorites.create({
      ...req.body,
      user_id: req.user._id,
    });
    res.status(200).json(newFavorite);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.delete("/favorites/:id", async (req, res) => {
  try {
    const newFavorite = await Favorites.deleteOne();
    res.status(200).json(newFavorite);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
