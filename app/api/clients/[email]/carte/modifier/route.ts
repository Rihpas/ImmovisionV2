import { NextRequest, NextResponse } from 'next/server';
import Client from '../../../../../model/Client';
import mongoose from 'mongoose';
import dbConnect from '../../../../../../lib/mongodb';

export async function PUT(req: NextRequest, { params }: { params: { email: string } }) {
  try {
    await dbConnect();
    const { email } = params;
    const updatedCarte = await req.json();
    const carteId = updatedCarte._id;

    if (!carteId || !mongoose.Types.ObjectId.isValid(carteId)) {
      return NextResponse.json({ error: 'ID carte invalide' }, { status: 400 });
    }

    const client = await Client.findOne({ email });
    if (!client) return NextResponse.json({ error: 'Client non trouvé' }, { status: 404 });

    const index = client.cartes.findIndex((c) => c._id?.toString() === carteId);
    if (index === -1) return NextResponse.json({ error: 'Carte non trouvée' }, { status: 404 });

    client.cartes[index] = { ...client.cartes[index].toObject(), ...updatedCarte };
    await client.save();

    return NextResponse.json({ message: 'Carte modifiée avec succès', carte: client.cartes[index] });
  } catch (error) {
    console.error('Erreur modification carte:', error);
    return NextResponse.json({ error: 'Erreur serveur lors de la modification' }, { status: 500 });
  }
}
