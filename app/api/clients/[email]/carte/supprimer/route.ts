import { NextRequest, NextResponse } from 'next/server';
import Client from '../../../../../model/Client';
import mongoose from 'mongoose';
import dbConnect from '../../../../../../lib/mongodb';

export async function DELETE(req: NextRequest, { params }: { params: { email: string } }) {
  try {
    await dbConnect();
    const { email } = params;
    const { carteId } = await req.json();

    if (!carteId || !mongoose.Types.ObjectId.isValid(carteId)) {
      return NextResponse.json({ error: 'ID carte invalide' }, { status: 400 });
    }

    const client = await Client.findOne({ email });
    if (!client) return NextResponse.json({ error: 'Client non trouvé' }, { status: 404 });

    client.cartes = client.cartes.filter((c) => c._id?.toString() !== carteId);
    await client.save();

    return NextResponse.json({ message: 'Carte supprimée avec succès', cartes: client.cartes });
  } catch (error) {
    console.error('Erreur suppression carte:', error);
    return NextResponse.json({ error: 'Erreur serveur lors de la suppression' }, { status: 500 });
  }
}
