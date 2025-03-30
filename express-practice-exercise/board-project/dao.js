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

async function update(id, title, body) {
  const sql = "UPDATE board SET title = ?, body = ? WHERE id = ?";
  await query(sql, [title, body, id]);
}

module.exports = { update };
