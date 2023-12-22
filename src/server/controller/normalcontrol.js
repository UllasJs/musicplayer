const NormalUser = require("../model/normal");

module.exports = {
  adduser: async (req, res) => {
    const { firstname, lastname, phone, email, password, role } = req.body;
    try {
      const result = await NormalUser.create({
        firstname,
        lastname,
        phone,
        email,
        password,
        role: "user",
      });
      res.status(200).json({ result });
    } catch (error) {
      res.status(401).json({ error });
    }
  },
  getuser: async (req, res) => {
    try {
      const getresult = await NormalUser.find();
      res.status(200).json({ getresult });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  getuserbyid: async (req, res) => {
    const id = req.params.id;
    try {
      const getresult = await NormalUser.findById(id);
      res.status(200).json({ getresult });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  updateuser: async (req, res) => {
    const id = req.params.id;
    try {
      await NormalUser.findByIdAndUpdate(id, {
        $set: req.body,
        // firstname: req.body.firstname,
        // lastname: req.body.lastname,
        // phone: req.body.phone,
        // email: req.body.eamil,
        // role: req.body.role,
      });
      res.status(200).json("success");
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  deleteuser: async (req, res) => {
    const id = req.params.id;
    try {
      await NormalUser.findByIdAndDelete(id);
      res.status(200).json("success");
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
