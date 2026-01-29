import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = "mongodb://root:example@localhost:27017";

export const mongoClient = new MongoClient(uri);
export const mongoDatabase = mongoClient.db("request-demo");
