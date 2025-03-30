const express = require("express");
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.post("/lotto", (req, res) => {
  req.body.as = req.body.df;
  res.render("lotto", req.body);
});

app.listen(3000, () => {
  console.log("3000번 포트에서 대기 중...");
});
