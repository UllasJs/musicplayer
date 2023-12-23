const TrackModel = require("../model/track");

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
};
