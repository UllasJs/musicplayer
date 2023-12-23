const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./music");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

const TrackControl = require("../controller/trackcontrol");

router.post("/addtrack", upload.single("music"), TrackControl.addTrack);

module.exports = router;
