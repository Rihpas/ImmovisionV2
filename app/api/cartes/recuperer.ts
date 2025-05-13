import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongodb'; 

const recupererCartes = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { email } = req.query;  // Email de l'utilisateur passé en paramètres

    if (!email) {
      return res.status(400).json({ error: 'Email requis.' });
    }

    const { db } = await connectToDatabase();

    // Récupérer toutes les cartes de l'utilisateur
    const cartes = await db.collection('cartes').find({ userId: email }).toArray();

    return res.status(200).json(cartes);
  } else {
    res.status(405).json({ error: 'Méthode non autorisée.' });
  }
};

export default recupererCartes;