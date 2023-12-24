const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaylistModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  musiclist: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("playlist", PlaylistModel);
