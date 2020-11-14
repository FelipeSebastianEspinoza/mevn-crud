const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { mongoUri, PORT } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.user(cors());
app.user(morgan("tiny"));
app.use(bodyParser.json());

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB database Connected... "))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello there!"));
app.listen(PORT, () => console.log(`Server Started!`));
