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
  const sql = "SELECT * FROM tweet";
  const results = await query(sql, null);
  return results;
}

async function create(writer, body) {
  const sql = "INSERT INTO tweet(writer, body, time) VALUES(?, ?, ?)";
  const result = await query(sql, [writer, body, new Date()]);
}

module.exports = { findAll, create };
