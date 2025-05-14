'use client';

import { useState } from 'react';
import CarteMentale from '../component/CarteMentale';

export default function DashboardPage() {
  const [cartes, setCartes] = useState<number[]>([]);

  const ajouterCarte = () => {
    setCartes((prev) => [...prev, Date.now()]);
  };

  const supprimerCarte = (keyToRemove: number) => {
    setCartes(cartes.filter((key) => key !== keyToRemove));
  };

  return (
    <div
      style={{
        maxWidth: '800px',
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {cartes.map((key) => (
          <CarteMentale key={key} onRemove={() => supprimerCarte(key)} />
        ))}
      </div>

      <button
        onClick={ajouterCarte}
        style={{
          marginTop: '25px',
          padding: '12px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        + Ajouter une carte
      </button>
    </div>
  );
}
