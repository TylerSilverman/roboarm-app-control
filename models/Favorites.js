const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoritesSchema = new Schema({
  motorLocation: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  motions: Array,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    refer: User,
  },
});

module.exports = Favorites = mongoose.model("Favorites", FavoritesSchema);
