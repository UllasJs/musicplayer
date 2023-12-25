const express = require("express");
const router = express.Router();

const PlaylistControl = require("../controller/playlistControl");

router.post("/addplaylist", PlaylistControl.addPlaylist);
router.get("/getplaylist", PlaylistControl.getplaylist);
router.put("/updateplaylist/:id", PlaylistControl.updateplaylist);
router.delete("/deletePlaylist/:id", PlaylistControl.deleteplaylist);

module.exports = router;
