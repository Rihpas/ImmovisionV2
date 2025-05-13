import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongodb'; 

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    const { db } = await connectToDatabase();

    // Vérifier si l'email existe déjà
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'L\'email est déjà utilisé.' });
    }

    // Créer un utilisateur
    await db.collection('users').insertOne({ email, password });

    return res.status(201).json({ message: 'Inscription réussie !' });
  } else {
    res.status(405).json({ error: 'Méthode non autorisée.' });
  }
};

export default register;
