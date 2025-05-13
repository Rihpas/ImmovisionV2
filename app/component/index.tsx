import { useState, useEffect } from 'react';
import CarteMentale from '../component/CarteMentale'; // Assure-toi que ce chemin est correct

const MonPortail = () => {
  const [cartes, setCartes] = useState<any[]>([]); // Initialisation comme un tableau vide
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    // Récupérer l'email de l'utilisateur connecté (ici via localStorage ou autre mécanisme)
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
      fetchCartes(email); // Appel à l'API pour récupérer les cartes
    }
  }, []);

  // Fonction pour récupérer les cartes de la base de données
  const fetchCartes = async (email: string) => {
    try {
      const response = await fetch(`/api/cartes/recuperer?email=${email}`);
      const data = await response.json();

      // Si la réponse est un tableau, on met à jour l'état des cartes
      if (Array.isArray(data)) {
        setCartes(data);
      } else {
        setCartes([]); // Si la réponse n'est pas valide, on initialise avec un tableau vide
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des cartes', error);
      setCartes([]); // En cas d'erreur, initialise avec un tableau vide
    }
  };

  // Fonction pour sauvegarder une carte dans la base de données
  const handleSaveCarte = async (carte: any) => {
    try {
      const response = await fetch('/api/cartes/ajouter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, carte }),
      });

      if (response.ok) {
        // Si la carte a été ajoutée avec succès, on récupère à nouveau les cartes
        fetchCartes(userEmail);
      } else {
        console.error('Erreur lors de l\'ajout de la carte');
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la carte', error);
    }
  };

  // Fonction pour ajouter une nouvelle carte vide
  const ajouterCarteVide = () => {
    const carteVide = {
      nomLieu: '',
      prix: '',
      metresCarres: '',
      localisation: '',
      imageUrls: [],
      siteUrl: '',
      visite: false,
      note: 0,
    };

    handleSaveCarte(carteVide); // Appeler la fonction pour enregistrer la carte vide
  };

  return (
    <div>
      <h1>Mon Portail</h1>
      {Array.isArray(cartes) && cartes.length > 0 ? (
        cartes.map((carte: any, index: number) => (
          <CarteMentale key={carte._id || index} carte={carte} onSave={handleSaveCarte} />
        ))
      ) : (
        <p>Aucune carte mentale trouvée.</p>
      )}

      {/* Bouton pour ajouter une nouvelle carte mentale */}
      <button onClick={ajouterCarteVide}>
        Ajouter une carte mentale
      </button>
    </div>
  );
};

export default MonPortail;
