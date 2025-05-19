import { NextRequest, NextResponse } from 'next/server';
import Client from '../../../../../model/Client';
import dbConnect from '../../../../../../lib/mongodb';

export async function GET(_req: NextRequest, { params }: { params: { email: string } }) {
  try {
    await dbConnect();
    const { email } = params;

    const client = await Client.findOne({ email });
    if (!client) return NextResponse.json({ error: 'Client non trouvé' }, { status: 404 });

    return NextResponse.json({ cartes: client.cartes });
  } catch (error) {
    console.error('Erreur récupération cartes:', error);
    return NextResponse.json({ error: 'Erreur serveur lors de la récupération' }, { status: 500 });
  }
}
