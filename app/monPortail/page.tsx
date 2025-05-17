'use client';

import { useState } from 'react';
import CarteMentale from '../component/CarteMentale';

export default function MonPortail() {
  // Les cartes contiennent des objets complets, pas juste des IDs
  const [cartes, setCartes] = useState([]);

  // Simulation d'email utilisateur connecté, remplace par ta gestion d'auth réelle
  const userEmail = 'utilisateur@example.com';

  const ajouterCarte = () => {
    // Nouvelle carte vide avec un nomLieu unique temporaire (ex: timestamp)
    const nouvelleCarte = {
      nomLieu: `Lieu-${Date.now()}`,
      prix: '',
      metresCarres: '',
      localisation: '',
      siteUrl: '',
      visite: false,
      note: 0,
      noteLibre: '',
      imageUrls: [],
      createdAt: new Date(),
    };

    setCartes(prev => [...prev, nouvelleCarte]);
  };

  const supprimerCarte = (nomLieuToRemove) => {
    setCartes(prev => prev.filter(c => c.nomLieu !== nomLieuToRemove));
    // Ici tu peux aussi appeler une API pour supprimer dans BDD si besoin
  };

  const onSaveCarte = async (carte) => {
    try {
      const res = await fetch('/api/cartes/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, carte }),
      });

      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');

      const data = await res.json();

      setCartes(data.cartes); // Met à jour avec les cartes depuis la BDD
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la sauvegarde');
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginLeft: '30px' }}>
        {cartes.map((carte) => (
          <CarteMentale
            key={carte.nomLieu}
            carte={carte}
            onRemove={() => supprimerCarte(carte.nomLieu)}
            onSave={onSaveCarte}
          />
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
      </div>
    </div>
  );
}
