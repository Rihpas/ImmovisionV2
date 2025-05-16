'use client'

import { useState, ChangeEvent, FormEvent } from 'react'

export default function RegisterPage() {
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
      const res = await fetch('/api/create', {
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
    <div
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '12px',
        backgroundColor: '#fff',
        color: '#000',
        boxShadow: '0 0 20px rgba(0,0,0,0.05)'
      }}
    >
      <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: '600' }}>Créer un compte</h2>

      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          required
          style={{
            padding: '10px',
            border: '2px solid #4CAF50',
            borderRadius: '6px',
            outline: 'none',
            color: '#000',
            backgroundColor: '#fff'
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            padding: '10px',
            border: '2px solid #4CAF50',
            borderRadius: '6px',
            outline: 'none',
            color: '#000',
            backgroundColor: '#fff'
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            padding: '10px',
            border: '2px solid #4CAF50',
            borderRadius: '6px',
            outline: 'none',
            color: '#000',
            backgroundColor: '#fff'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Créer le compte
        </button>
      </form>
    </div>
  )
}
