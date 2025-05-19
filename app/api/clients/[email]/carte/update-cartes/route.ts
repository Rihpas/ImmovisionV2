import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../utils/mongodb';

export async function POST(request: Request) {
  try {
    const { email, cartes } = await request.json();

    if (!email || !Array.isArray(cartes)) {
      return NextResponse.json({ message: 'Email ou cartes manquants ou invalides' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const collection = db.collection('clients');

    const result = await collection.updateOne(
      { email },
      { $set: { carte: cartes } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'Client non trouvé ou aucune modification' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur API update-cartes:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}