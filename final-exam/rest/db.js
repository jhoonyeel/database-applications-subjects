import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://nodejs:1234@0.0.0.0:27017");
let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}
let db = conn.db("nodedb");
export default db;
