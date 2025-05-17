'use client';

import { useState } from 'react';
import CarteMentale from '../component/CarteMentale';

export default function MonPortail() {
  const [cartes, setCartes] = useState<number[]>([]);

  const ajouterCarte = () => {
    setCartes((prev) => [...prev, Date.now()]);
  };

  const supprimerCarte = (keyToRemove: number) => {
    setCartes(cartes.filter((key) => key !== keyToRemove));
  };

  // Pour l'instant, les données ne remontent pas,
  // donc ce bouton peut déclencher une sauvegarde globale fictive
  const sauvegarderTout = () => {
    alert('Fonction sauvegarder à implémenter : récupérer et stocker les données.');
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
      <p style={{ marginBottom: '20px' }}>Données chargées avec succès !</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginLeft: '30px' }}>
        {cartes.map((key) => (
          <CarteMentale key={key} onRemove={() => supprimerCarte(key)} />
        ))}
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
          💾 Tout sauvegarder
        </button>
      </div>
    </div>
  );
}
