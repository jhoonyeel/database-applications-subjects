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

function isAuthenticated(req, res, next) {
  if (req.session.login) next();
  else next("route");
}

app.get("/", isAuthenticated, async (req, res, next) => {
  const obj = { login: req.session.login, rows: await dao.findAll() };
  res.send("tweet", obj);
});

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "login.html");
});

app.post("/login", (req, res, next) => {
  req.session.regenerate((err) => {
    if (err) next(err);
    req.session.login = req.body.name;
    res.redirect("/"); // 리다이렉트 후 자동으로 GET '/' 요청 보냄.
  });
});

app.post("/tweet", async (req, res, next) => {
  await dao.create(req.session.login, req.body.message);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("3000번 포트에서 대기중");
});
