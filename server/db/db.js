import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const dbPassword = process.env.DB_PASSWORD;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "jobTracker",
  password: dbPassword,
  port: 5432,
});
db.connect();
export default db;
