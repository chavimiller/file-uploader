const express = require("express");
const app = express();
const path = require("node:path");
const authRouter = require("./routes/authRouter");
const folderRouter = require("./routes/folderRouter");
const fileRouter = require("./routes/fileRouter");
const homeRouter = require("./routes/homeRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/auth/signup");
});

app.use("/auth", authRouter);
app.use("/folder", folderRouter);
app.use("/file", fileRouter);
app.use("/home", homeRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on port ${PORT}!`);
});
