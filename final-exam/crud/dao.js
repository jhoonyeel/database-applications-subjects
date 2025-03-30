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
  const sql = "SELECT * FROM Contact";
  const results = await query(sql, null);
  return results;
}

async function findOne(id) {
  const sql = "SELECT * FROM Contact WHERE id = ?";
  const result = await query(sql, [id]);
  return result[0];
}

async function insertOne(name, phone, email) {
  const sql = "INSERT INTO Contact(name, phone, email) VALUES(?, ?, ?)";
  const result = await query(sql, [name, phone, email]);
}

async function remove(id) {
  const sql = "DELETE FROM Contact WHERE id = ?";
  const result = await query(sql, [id]);
}

module.exports = { findAll, findOne, insertOne, remove };
