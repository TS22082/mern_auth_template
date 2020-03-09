const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const auth = require("./routes/auth-routes");
app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
