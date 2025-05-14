'use client'
import { useState, FormEvent } from 'react';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function CreateAccount() {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Tous les champs sont requis.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setSuccessMessage('Votre compte a été créé avec succès !');
    console.log('Compte créé avec email:', formData.email);
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '12px',
        backgroundColor: '#fff',
        color: '#000', // <-- important : tout en noir
        boxShadow: '0 0 20px rgba(0,0,0,0.05)',
      }}
    >
      <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: '600' }}>Créer un compte</h2>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Entrez votre email"
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #4CAF50',
              borderRadius: '6px',
              outline: 'none',
              color: '#000', // <-- texte en noir
              backgroundColor: '#fff', // <-- fond blanc
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Entrez votre mot de passe"
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #4CAF50',
              borderRadius: '6px',
              outline: 'none',
              color: '#000',
              backgroundColor: '#fff',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>Confirmer le mot de passe :</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirmez votre mot de passe"
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #4CAF50',
              borderRadius: '6px',
              outline: 'none',
              color: '#000',
              backgroundColor: '#fff',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Créer le compte
        </button>
      </form>
    </div>
  );
}
