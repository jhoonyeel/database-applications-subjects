const express = require("express");

const app = express();
const dao = require("./dao");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

/* 디버깅용 미들웨어 */
app.use((req, res, next) => {
  console.log("url:", req.url, "method: ", req.method);
  next();
});

app.get("/list", async (req, res, next) => {
  const results = await dao.findAll();
  res.render("list", { results });
});

app.get("/create", (req, res, next) => {
  res.render("create");
});

app.post("/create", async (req, res, next) => {
  const result = await dao.insertOne(
    req.body.name,
    req.body.phone,
    req.body.email
  );
  res.redirect("/list");
});

app.get("/detail/:id", async (req, res, next) => {
  const result = await dao.findOne(req.params.id);
  res.render("detail", { result });
});

// BUG: remove 버튼 해결 필요
app.delete("/remove/:id", async (req, res, next) => {
  const result = await dao.remove(req.params.id);
  res.redirect(`/detail/${res.params.id}`);
});

app.listen(3000, () => console.log("3000번 포트에서 대기중"));
