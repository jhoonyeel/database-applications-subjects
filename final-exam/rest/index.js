import express from "express";
import db from "./db.js";
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const student = db.collection("student");
  const results = await student.find({}).toArray();
  res.send(results).status(200);
});

app.post("/", async (req, res) => {
  const student = db.collection("student");
  const result = await student.insertOne(req.body);
  res.redirect("/");
});

// BUG: result가 []임.
app.get("/stat/:name", async (req, res) => {
  const student = db.collection("student");
  const result = await student
    .aggregate([
      { $match: { department: req.params.name } },
      {
        $group: {
          _id: "$department",
          avg_grade: { $avg: "$grade" },
        },
      },
    ])
    .toArray();
  console.log(result);
  res.send(result).status(200);
});

app.listen(3000, () => {
  console.log(`Server is running on port: 3000`);
});
