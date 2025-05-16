import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Add MONGODB_URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In dev, use a global variable to preserve value across reloads
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production, no global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
