'use client'

import { useState } from 'react'

export default function FormulaireClient() {
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/enregistrer-client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, email })
    })

    if (res.ok) {
      alert('Client enregistré !')
      setNom('')
      setEmail('')
    } else {
      alert('Erreur lors de l’enregistrement.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <button type="submit" className="bg-green-600 text-white p-2 rounded">
        Enregistrer
      </button>
    </form>
  )
}
