const express = require("express");
const session = require("express-session");

const app = express();
const dao = require("./dao");

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "My Secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use((req, res, next) => {
  console.log("url: ", req.url, "method: ", req.method);
  next();
});
