import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

export const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  database: "xolitask",
  password: "",
});

export const db = drizzle(connection, { schema, mode: "default" });
