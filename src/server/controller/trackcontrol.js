const TrackModel = require("../model/track");
const path = require("path");

module.exports = {
  addTrack: async (req, res) => {
    const { artist, title, likes, dislikes } = req.body;
    const file = req.file;
    try {
      const result = await TrackModel.create({
        artist,
        title,
        music: file.filename,
        likes,
        dislikes,
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
  editTrack: async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    try {
      await TrackModel.findByIdAndUpdate(id, {
        $set: req.body,
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  
};
