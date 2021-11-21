import { MongoClient } from "mongodb";

const { NODE_ENV, DB_CONNECTION_STRING: ENV_DB_CONNECTION_STRING } =
  process.env;

const connectionString =
  NODE_ENV === "production"
    ? ENV_DB_CONNECTION_STRING
    : "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000";

export const client = new MongoClient(connectionString, {
  monitorCommands: true,
});

// setup our monitoring
client.on("commandStarted", console.debug);
client.on("commandSucceeded", console.debug);
client.on("commandFailed", console.debug);

try {
  await client.connect();
} catch (err) {
  console.error(
    `An error has occured while connecting to the database: ${err}`
  );
}

const db = client.db("software-engineering-immersive");

export default db;

export const studentsCollection = db.collection("students");
