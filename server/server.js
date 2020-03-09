const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mern_auth_template";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("connected to db instance"))
  .catch(err => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `http://localhost:3000` }));
}

// middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// routes
const authRoutes = require("./routes/auth-routes");
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
