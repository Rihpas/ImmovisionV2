import { NextRequest, NextResponse } from 'next/server';
import Client from '../../../../model/Client';
import dbConnect from '../../../../../lib/mongo';

export async function GET(_req: NextRequest, { params }: { params: { email: string } }) {
  try {
    await dbConnect();
    const { email } = params;

    const client = await Client.findOne({ email }, '-cartes -password'); // sans cartes ni password
    if (!client) return NextResponse.json({ error: 'Client non trouvé' }, { status: 404 });

    return NextResponse.json({ client });
  } catch (error) {
    console.error('Erreur récupération client:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
