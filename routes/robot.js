const router = require("express").Router();
const { Robot } = require("../models");
const { io } = require("socket.io-client");

// Create a variable that will pass the data to the claw server through socket.io
const socket = io("https://roboarmcontrol.herokuapp.com/dashboard", {
  // const socket = io("http://robotarm.dyndns.org/", {
  withCredentials: true,
});

router.get("/robotmotions", async (req, res) => {
  try {
    const robotMotions = await Robot.find({});
    res.json(robotMotions);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post("/robotmotions", async (req, res) => {
  try {
    console.log(req.body);
    socket.emit("pwmpulse", req.body.motions.channel, req.body.motions.pulse);
    return req.body.motions.channel, req.body.motions.pulse;
    res.status(200);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
