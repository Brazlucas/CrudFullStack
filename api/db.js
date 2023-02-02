import mysql from "mysql";
import * as dotenv from 'dotenv'

console.log(process.env)

dotenv.config()
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: "crud"
});