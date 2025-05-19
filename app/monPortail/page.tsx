'use client';

import { useState } from 'react';
import CarteMentale from '../component/CarteMentale';
import React from 'react';
export default function MonPortail() {
  const [cartes, setCartes] = useState<any[]>([]);
  const [emailUtilisateur, setEmailUtilisateur] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recupererCartes = async () => {
    if (!emailUtilisateur) {
      setError("L'email est vide, veuillez renseigner un email.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/get-cartes?email=${encodeURIComponent(emailUtilisateur)}`);
      const text = await response.text();
      console.log('Contenu brut :', text);

      try {
        const data = JSON.parse(text);
        setCartes(data.cartes || []);
      } catch (e) {
        console.error('Erreur de parsing JSON :', e);
        setError('Réponse invalide reçue du serveur.');
        setCartes([]);
      }
    } catch (err) {
      console.error('Erreur réseau:', err);
      setError('Erreur lors de la récupération des cartes.');
      setCartes([]);
    } finally {
      setLoading(false);
    }
  };

  const ajouterCarte = () => {
    setCartes((prev) => [
      ...prev,
      {
        id: Date.now(),
        nomLieu: '',
        prix: '',
        metresCarres: '',
        localisation: '',
        imageUrls: [],
        siteUrl: '',
        visite: false,
        note: 0,
        noteLibre: '',
      },
    ]);
  };

  const supprimerCarte = (idToRemove: number) => {
    setCartes(cartes.filter((carte) => carte.id !== idToRemove));
  };

  const onSave = (updatedCarte: any) => {
    setCartes((prev) =>
      prev.map((carte) =>
        carte.id === updatedCarte.id ? { ...updatedCarte } : carte
      )
    );
  };

  const sauvegarderTout = async () => {
    if (!emailUtilisateur) {
      alert("Veuillez renseigner votre email pour sauvegarder les cartes.");
      return;
    }

    try {
      const response = await fetch(`api/clients/[email]/carte/update-cartes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailUtilisateur,
          cartes,
        }),
      });

      const text = await response.text();
      console.log('Contenu brut :', text);
      const data = JSON.parse(text);

      if (response.ok) {
        alert('Cartes sauvegardées avec succès !');
      } else {
        alert(`Erreur : ${data.message}`);
      }
    } catch (err) {
      console.error('Erreur réseau:', err);
      alert('Erreur lors de la sauvegarde.');
    }
  };

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '30px',
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0,0,0,0.05)',
      }}
    >
      <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '10px' }}>
        Bienvenue sur votre portail
      </h2>
      <p style={{ marginBottom: '20px' }}>
        {loading ? 'Chargement des cartes...' : 'Données chargées avec succès !'}
      </p>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px' }}>
          Votre adresse email
        </label>
        <input
          type="email"
          value={emailUtilisateur}
          onChange={(e) => setEmailUtilisateur(e.target.value)}
          placeholder="exemple@domaine.com"
          className="border p-2 w-full"
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={recupererCartes}
          disabled={!emailUtilisateur || loading}
          style={{
            padding: '12px 20px',
            backgroundColor: '#17a2b8',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: emailUtilisateur && !loading ? 'pointer' : 'not-allowed',
            width: '100%',
          }}
        >
          Charger les cartes
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginLeft: '30px' }}>
        {cartes.length > 0 ? (
          cartes.map((carte) => (
            <CarteMentale
              key={carte.id}
              carte={carte}
              onRemove={() => supprimerCarte(carte.id)}
              onSave={onSave}
            />
          ))
        ) : (
          <p>Aucune carte à afficher.</p>
        )}
      </div>

      <div style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
        <button
          onClick={ajouterCarte}
          style={{
            padding: '12px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            flex: 1,
          }}
        >
          + Ajouter une carte
        </button>

        <button
          onClick={sauvegarderTout}
          style={{
            padding: '12px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            flex: 1,
          }}
        >
          💾 sauvegarder les cartes
        </button>
      </div>
    </div>
  );
}