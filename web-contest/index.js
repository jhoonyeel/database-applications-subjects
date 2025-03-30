const express = require("express");
const app = express();
const dao = require("./dao");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.log("url:", req.url, "method: ", req.method);
  next();
});

app.get("/", async (req, res, next) => {
  const results = await dao.findAll();
  res.render("home", { posts: results });
});

app.get("/create", async (req, res, next) => {
  res.render("create");
});

app.post("/create", async (req, res, next) => {
  await dao.insertOne(req.body.writer, req.body.title, req.body.body);
  res.redirect("/");
});

app.get("/update/:id", async (req, res, next) => {
  await dao.updateOne(
    req.body.writer,
    req.body.title,
    req.body.body,
    req.params.id
  );
  const result = await dao.findOne(req.params.id);
  res.render("update", { post: result });
});

app.listen(3000, () => console.log("3000번 포트에서 대기 중"));
