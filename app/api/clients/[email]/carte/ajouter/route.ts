import { NextResponse } from 'next/server'
import clientPromise from '../../../../../utils/mongodb'

export async function POST(req: Request, { params }: { params: { email: string } }) {
  try {
    const email = decodeURIComponent(params.email);
    const newCarte = await req.json();

    const client = await clientPromise;
    const db = client.db('immovision');
    const collection = db.collection('clients');

    const result = await collection.updateOne(
      { email },
      { $push: { cartes: { ...newCarte, createdAt: new Date() } } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'Client non trouvé ou carte non ajoutée' }, { status: 404 });
    }

    return NextResponse.json({ success: true, carte: newCarte });
  } catch (error) {
    console.error('Erreur ajout carte:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}