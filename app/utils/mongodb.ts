// utils/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Récupère l'URI de MongoDB depuis .env.local

let client;
let clientPromise;

// En développement, on utilise un client global MongoDB pour éviter de créer de nouvelles connexions à chaque rechargement de page.
if (process.env.NODE_ENV === 'development') {
  // En développement, MongoDB crée une connexion persistante
  if (global._mongoClientPromise) {
    // Utilisation du client MongoDB global pour éviter de recréer la connexion à chaque rechargement de page
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    global._mongoClientPromise = client.connect();
    clientPromise = global._mongoClientPromise;
  }
} else {
  // En production, une nouvelle connexion est créée pour chaque requête
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  clientPromise = client.connect();
}

export const connectToDatabase = async () => {
  const clientConnection = await clientPromise;
  const db = clientConnection.db(); // Sélection de la base de données par défaut
  return db;
};
