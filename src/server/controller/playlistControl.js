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
};
