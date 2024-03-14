const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./router/authRoutes");
const config = require("./config/config");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(config.databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
