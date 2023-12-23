const TrackModel = require("../model/track");
const path = require("path");

module.exports = {
  addTrack: async (req, res) => {
    const { artist, title } = req.body;
    const file = req.file;
    try {
      const result = await TrackModel.create({
        artist,
        title,
        music: file.filename,
      });

      res.status(200).json({ result });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  getTrack: async (req, res) => {
    try {
      const getresult = await TrackModel.find();
      res.status(200).json({ getresult });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  getAudio: async (req, res) => {
    const filename = req.params.filename;
    const dirname = path.join(`${__dirname}`, "../music");
    res.sendFile(`${dirname}/${filename}`);
  },
};
