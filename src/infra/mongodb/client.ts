import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL ?? "mongodb://root:example@mongo:27017";

export const mongoClient = new MongoClient(uri);
export const mongoDatabase = mongoClient.db("request-demo");
