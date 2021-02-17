const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RobotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  motions: Array,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    refer: User,
  },
});

module.exports = Robot = mongoose.model("Robot", RobotSchema);
