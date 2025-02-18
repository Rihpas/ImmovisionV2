// pages/login.tsx
'use client'
import { useState, FormEvent } from 'react';


// Définition des types pour l'état de la page
interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  

  // Mise à jour des champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Réinitialisation de l'erreur
    setError('');

    // Validation simple des champs
    if (!formData.email || !formData.password) {
      setError('Tous les champs sont requis.');
      return;
    }

    // Simuler l'authentification (remplace par une logique d'authentification réelle)
    if (formData.email === 'test@immovision.com' && formData.password === '123') {
      // Redirection après connexion réussie
      console.log("test");
      //router.push('/dashboard');  // Remplace '/dashboard' par la page vers laquelle tu veux rediriger
    } else {
      setError('Email ou mot de passe incorrect.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Se connecter</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
  value={formData.email}
  onChange={handleChange}
  required
  style={{
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '2px solid #4CAF50',  // Bordure verte de 2px
    borderRadius: '4px',          // Coins arrondis
    outline: 'none',              // Supprimer le contour bleu par défaut au focus
  }}
/>

        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                border: '2px solid #4CAF50',  // Bordure verte de 2px
                borderRadius: '4px',          // Coins arrondis
                outline: 'none',              // Supprimer le contour bleu par défaut au focus
              }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Se connecter
        </button>
      </form>
    </div>
  );
}
