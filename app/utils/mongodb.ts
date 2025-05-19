// utils/mongodb.ts
import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'immovision';

if (!uri) {
  throw new Error('MONGODB_URI n’est pas défini dans le fichier .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Ajouté pour éviter les erreurs de types avec global dans TypeScript
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise!;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export const connectToDatabase = async (): Promise<Db> => {
  const client = await clientPromise;
  return client.db(dbName); // Utilise immovision par défaut
};
 export default clientPromise