import clientPromise from '@/lib/mongo'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { nom, email } = await request.json()

  if (!nom || !email) {
    return NextResponse.json({ message: 'Nom et email requis' }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db('immovision')
    const collection = db.collection('clients')

    const resultat = await collection.insertOne({ nom, email, date: new Date() })
    return NextResponse.json({ success: true, id: resultat.insertedId }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}
