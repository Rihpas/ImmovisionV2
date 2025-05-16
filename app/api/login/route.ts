import clientPromise from '@/lib/mongo'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: 'Champs manquants' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('immovision')
    const user = await db.collection('clients').findOne({ email })

    if (!user) {
      return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 401 })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return NextResponse.json({ message: 'Mot de passe incorrect' }, { status: 401 })
    }

    // Connexion réussie
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Erreur login:', error)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}
