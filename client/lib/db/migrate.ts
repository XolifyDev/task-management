const { db, connection } = require("./db.ts");
const { migrate } = require("drizzle-orm/mysql2/migrator");

migrate(db, { migrationsFolder: "./migrations" }).then((data) => {
  console.log(data);
});

connection.end();
