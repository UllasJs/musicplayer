const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackModel = new Schema({
  artist: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  music: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  dislikes: {
    type: Number,
  },
});

module.exports = mongoose.model("track", TrackModel);
