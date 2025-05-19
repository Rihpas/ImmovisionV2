import { connectToDatabase } from '../../../lib/mongodb'; // Exemple d'import de fonction de connexion MongoDB

export default async function handler(req, res) {
  const { email } = req.query;

  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const utilisateur = await db.collection('users').findOne({ email });

      if (!utilisateur) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Retourner les cartes de l'utilisateur
      return res.status(200).json({ cartes: utilisateur.cartes || [] });
    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  res.status(405).json({ message: 'Méthode non autorisée' });
}