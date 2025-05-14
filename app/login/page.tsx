'use client'
import { useState, FormEvent } from 'react';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Tous les champs sont requis.');
      return;
    }

    if (formData.email === 'test@immovision.com' && formData.password === '123') {
      console.log("Connexion réussie");
      window.location.href = 'http://localhost:3000/monPortail';
    } else {
      setError('Email ou mot de passe incorrect.');
    }
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
        color: '#000',
        boxShadow: '0 0 20px rgba(0,0,0,0.05)',
      }}
    >
      <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: '600' }}>Se connecter</h2>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

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
              color: '#000',
              backgroundColor: '#fff',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
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
          Se connecter
        </button>
      </form>
    </div>
  );
}
