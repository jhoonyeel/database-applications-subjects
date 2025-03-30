const mysql = require("mysql2/promise");

async function query(sql, params) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "nodejs",
    password: "1234",
    database: "nodedb",
  });

  const [results] = await conn.query(sql, params);
  return results;
}

async function findAll() {
  const sql = "SELECT * FROM news";
  return await query(sql, null);
}

async function findOne(id) {
  const sql = "SELECT * FROM news WHERE = ?";
  return await query(sql, [id]);
}

async function insertOne(writer, title, body) {
  const sql =
    "INSERT INTO news(writer, title, body, createAtTime) values(?, ?, ?, now());";
  await query(sql, [writer, title, body]);
}

async function updateOne(writer, title, body, id) {
  const sql = "UPDATE news (writer, title, body) SET(?,?,?) WHERE id = ?";
  await query(sql, [id]);
}
module.exports = { findAll, findOne, insertOne, updateOne };
