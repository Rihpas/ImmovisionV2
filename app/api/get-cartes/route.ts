import clientPromise from '@/lib/mongo'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ message: 'Email manquant' }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db('immovision')
    const utilisateur = await db.collection('clients').findOne({ email })

    if (!utilisateur) {
      return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 })
    }

    return NextResponse.json({ cartes: utilisateur.carte || [] }, { status: 200 })
  } catch (error) {
    console.error('Erreur récupération cartes :', error)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}
