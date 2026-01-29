import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://root:example@localhost:27017";
const dbName = process.env.MONGODB_DB || "request-demo";

export const mongoClient = new MongoClient(uri);
export const mongoDatabase = mongoClient.db(dbName);
