import clientPromise from '@/lib/mongo'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const { nom, email, password } = await request.json()

    if (!nom || !email || !password) {
      return NextResponse.json({ message: 'Champs manquants' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('immovision')
    const collection = db.collection('clients')

    const exist = await collection.findOne({ email })
    if (exist) {
      return NextResponse.json({ message: 'Email déjà utilisé' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await collection.insertOne({
      nom,
      email,
      carte:[],
      password: hashedPassword,
      createdAt: new Date()
    })

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error('Erreur API create-user:', error)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}
