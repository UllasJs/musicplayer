const PlayListModel = require("../model/playlist");

module.exports = {
  addPlaylist: async (req, res) => {
    const { name, user, musiclist } = req.body;

    try {
      const result = await PlayListModel.create({
        name,
        user,
        musiclist,
      });

      res.status(200).json({ result });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  getplaylist: async (req, res) => {
    try {
      const getresult = await PlayListModel.find();
      res.status(200).json({ getresult });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  getplaylistbyid: async (req, res) => {
    const id = req.params.id;
    try {
      const getresult = await PlayListModel.findById(id);
      res.status(200).json({ getresult });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  updateplaylist: async (req, res) => {
    const id = req.params.id;

    console.log(id);
    try {
      await PlayListModel.findByIdAndUpdate(id, {
        $set: req.body,
      });
      res.status(200).json("success");
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  deleteplaylist: async (req, res) => {
    const id = req.params.id;
    try {
      await PlayListModel.findByIdAndDelete(id);
      res.status(200).json("success");
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
