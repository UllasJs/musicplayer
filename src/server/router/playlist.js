const express = require("express");
const router = express.Router();

const PlaylistControl = require("../controller/playlistControl");

router.post("/addplaylist", PlaylistControl.addPlaylist);
router.get("/getplaylist", PlaylistControl.getplaylist);

module.exports = router;
