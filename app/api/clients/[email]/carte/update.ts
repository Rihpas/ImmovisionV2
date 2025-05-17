
import { NextRequest, NextResponse } from 'next/server';
import Client from '../../../../model/Client';
import dbConnect from '../../../../../lib/mongo';

export async function PUT(req: NextRequest, { params }: { params: { email: string } }) {
  try {
    await dbConnect();
    const { email } = params;
    const updates = await req.json();

    const client = await Client.findOneAndUpdate({ email }, updates, { new: true, fields: '-password' });
    if (!client) return NextResponse.json({ error: 'Client non trouvé' }, { status: 404 });

    return NextResponse.json({ message: 'Client mis à jour', client });
  } catch (error) {
    console.error('Erreur mise à jour client:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
