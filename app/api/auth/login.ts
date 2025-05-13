import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongodb'; // Assure-toi d'avoir une fonction de connexion

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    const { db } = await connectToDatabase();

    const user = await db.collection('users').findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }

    // Créer un JWT ou session ici pour maintenir l'utilisateur connecté
    // Par exemple, en renvoyant un token JWT ou un ID utilisateur
    return res.status(200).json({ message: 'Connexion réussie' });
  } else {
    res.status(405).json({ error: 'Méthode non autorisée.' });
  }
};

export default login;