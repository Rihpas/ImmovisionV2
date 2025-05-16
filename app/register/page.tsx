'use client'

import { useState, ChangeEvent, FormEvent } from 'react'

export default function Page() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    const { nom, email, password } = formData

    if (!nom || !email || !password) {
      setError('Tous les champs sont requis.')
      return
    }

    try {
      const res = await fetch('api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, password })
      })
      if (res.ok) {
        setSuccessMessage('Compte créé avec succès !')
        setFormData({ nom: '', email: '', password: '' })
      } else {
        const data = await res.json()
        setError(data.message || 'Erreur lors de la création du compte.')
      }
    } catch {
      setError('Erreur serveur.')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Créer un compte</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          required
          style={{ padding: 8 }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: 8 }}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ padding: 8 }}
        />
        <button type="submit" style={{ padding: 10, backgroundColor: 'green', color: 'white' }}>
          Créer le compte
        </button>
      </form>
    </div>
  )
}
