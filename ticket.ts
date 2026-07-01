import { getDb } from "../api/queries/connection";

async function main() {
  const db = getDb();
  await db.execute("DROP TABLE IF EXISTS tickets");
  console.log("Dropped tickets table");
}

main().catch(console.error);
