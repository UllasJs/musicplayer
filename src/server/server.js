const express = require("express");
const bodyparser = require("body-parser");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const port = 2000;

const normalRouter = require("./router/normal");

app.use(bodyparser.json());
app.use(cors());
app.use("/user", normalRouter);

app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});

mongoose
  .connect(
    `mongodb+srv://ullasjskadakkal:Ullasjs1920@musicplayernode.vttxsk6.mongodb.net/`,
    {}
  )
  .then(() => console.log("Mongoose Connected!"))
  .catch((error) => console.log("Error"));
