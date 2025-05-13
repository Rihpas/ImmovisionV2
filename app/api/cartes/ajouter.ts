import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongodb';

const ajouterCarte = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, carte } = req.body;

    if (!email || !carte) {
      return res.status(400).json({ error: 'Les données sont incomplètes.' });
    }

    const db = await connectToDatabase();

    await db.collection('cartes').insertOne({
      userId: email,
      ...carte,
    });

    return res.status(201).json({ message: 'Carte mentale enregistrée.' });
  } else {
    res.status(405).json({ error: 'Méthode non autorisée.' });
  }
};

export default ajouterCarte;
