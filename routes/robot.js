const router = require("express").Router();
const { Robot } = require("../models");

router.get("/robotmotions", async (req, res) => {
  try {
    const robotMotions = await Robot.find({});
    res.json(robotMotions);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
