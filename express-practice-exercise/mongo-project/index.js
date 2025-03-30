import express from "express";
import db from "./db.js";

const app = express();
app.use(express.json());

app.get("/", async (req, res, next) => {
  const sales = db.collection("sales");
  const results = await sales.find().toArray();
  res.send(results).status(200);
});

app.get("/:id", async (req, res, next) => {
  const sales = db.collection("sales");
  const result = await sales.findOne({ _id: parseInt(req.params.id) });
  res.send(result).status(200);
});

app.post("/", async (req, res, next) => {
  const sales = db.collection("sales");
  const result = await sales.insertOne(req.body);
  res.redirect("/");
});

app.put("/:id", async (req, res, next) => {
  const sales = db.collection("sales");
  const result = await sales.replaceOne(
    { _id: parseInt(req.params.id) },
    req.body
  );
  res.redirect("/");
});

app.delete("/:id", async (req, res, next) => {
  const sales = db.collection("sales");
  const result = await sales.deleteOne({ _id: parseInt(req.params.id) });
  res.redirect("/");
});

app.listen(3000, () => console.log("3000번 포트에서 대기중"));
