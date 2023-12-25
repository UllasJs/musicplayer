const NormalUser = require("../model/normal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SigninValidation = require("../validation/signin");
const SignupValidation = require("../validation/signup");

module.exports = {
  adduser: async (req, res) => {
    const { firstname, lastname, phone, email, password } = req.body;
    const { errors, isValid } = SignupValidation(req.body);
    try {
      if (!isValid) {
        res.status(200).json(errors);
      } else {
        await NormalUser.findOne({ email }).then(async (exist) => {
          if (exist) {
            errors.email = "Email Already in Use";
            res.status(404).json(errors);
          } else {
            const hashedpassword = bcrypt.hashSync(password, 8);
            const result = await NormalUser.create({
              firstname,
              lastname,
              phone,
              email,
              password: hashedpassword,
              role: "user",
            });
            res.status(200).json({ message: "user added sucess" });
          }
        });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  signin: async (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = SigninValidation(req.body);

    try {
      if (!isValid) {
        res.status(400).json(errors);
      } else {
        await NormalUser.findOne({ email }).then(async (user) => {
          if (!user) {
            errors.email =
              "Email does not exist! Please Enter thr right Email or You can make a new account";
            res.status(400).json(errors);
          }

          const passwordMatch = bcrypt.compareSync(password, user.password);
          if (!passwordMatch) {
            errors.password = "Wrong Password!";
            res.status(400).json(errors);
          } else {
            const token = jwt.sign(
              { _id: user._id, role: user.role },
              "user_DOING_GOOD",
              {
                expiresIn: "8h",
              }
            );
            res.status(201).json({
              token,
              role: user.role,
            });
          }
        });
      }
    } catch (error) {}
  },
  verifyToken: async (req, res) => {
    try {
      const token = req.body.token;
      const decoded = jwt.verify(token, "user_DOING_GOOD");
      res.status(200).json(decoded);
    } catch (error) {
      return res.status(401).json({
        message: "Auth Failed",
      });
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
  // loginuser: async (req, res) => {
  //   const { email, password } = req.body;
  //   const { errors, isValid } = SigninValidation(req.body);

  // },
};
