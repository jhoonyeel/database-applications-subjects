import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://nodejs:1234@0.0.0.0:27017");
let conn;

try {
  conn = await client.connect();
} catch (error) {
  console.error(error);
}

const db = conn.db("nodedb");

export default db;

// type: module 설정
// nodemon express mongodb 설치
