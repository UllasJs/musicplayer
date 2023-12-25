const express = require("express");
const router = express.Router();

const Normalcontrol = require("../controller/normalcontrol");

router.post("/adduser", Normalcontrol.adduser);
router.post("/signin", Normalcontrol.signin);
router.get("/getuser", Normalcontrol.getuser);
router.get("/getuserbyid/:id", Normalcontrol.getuserbyid);
router.put("/updateuser/:id", Normalcontrol.updateuser);
router.delete("/deleteuser/:id", Normalcontrol.deleteuser);
router.post("/verifyToken",Normalcontrol.verifyToken);

module.exports = router;
