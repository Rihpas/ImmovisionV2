'use client';

import { useRef } from 'react';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface CarteMentaleProps {
  onRemove: () => void;
}

const CarteMentale: React.FC<CarteMentaleProps> = ({ onRemove }) => {
  const [nomLieu, setNomLieu] = useState('');
  const [prix, setPrix] = useState('');
  const [metresCarres, setMetresCarres] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [nouvelleImage, setNouvelleImage] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [visite, setVisite] = useState(false);
  const [note, setNote] = useState<number>(0);
  const [noteLibre, setNoteLibre] = useState('');

  const carteRef = useRef<HTMLDivElement>(null);

  const ajouterImage = () => {
    if (nouvelleImage.trim() !== '') {
      setImageUrls([...imageUrls, nouvelleImage.trim()]);
      setNouvelleImage('');
    }
  };

  const supprimerImage = (index: number) => {
    const copie = [...imageUrls];
    copie.splice(index, 1);
    setImageUrls(copie);
  };

  const modifierImage = (index: number, nouvelleValeur: string) => {
    const copie = [...imageUrls];
    copie[index] = nouvelleValeur;
    setImageUrls(copie);
  };

  const imprimerCarte = () => {
    if (!carteRef.current) return;
    const contenu = carteRef.current.innerHTML;
    const fenetre = window.open('', '_blank');
    if (fenetre) {
      fenetre.document.write(`
        <html>
          <head>
            <title>Impression Carte Mentale</title>
            <style>
              body { font-family: sans-serif; padding: 20px; }
              img { max-width: 100%; height: auto; }
              .note-libre { white-space: pre-wrap; }
            </style>
          </head>
          <body>${contenu}</body>
        </html>
      `);
      fenetre.document.close();
      fenetre.focus();
      fenetre.print();
      fenetre.close();
    }
  };

  return (
    <div className="border p-4 rounded-lg my-4 shadow-md flex gap-6">
      <div className="flex-1" ref={carteRef}>
        <div className="flex justify-between mb-2">
          <h3 className="font-bold">Carte Mentale - Logement</h3>
          <button onClick={onRemove} className="text-red-500 hover:underline">
            Supprimer
          </button>
        </div>

        {/* Champs */}
        <div className="mb-2">
          <label className="block">Nom du lieu</label>
          <input type="text" value={nomLieu} onChange={(e) => setNomLieu(e.target.value)} className="border p-2 w-full" />
        </div>
        <div className="mb-2">
          <label className="block">Prix</label>
          <input type="text" value={prix} onChange={(e) => setPrix(e.target.value)} className="border p-2 w-full" />
        </div>
        <div className="mb-2">
          <label className="block">Mètres carrés</label>
          <input type="text" value={metresCarres} onChange={(e) => setMetresCarres(e.target.value)} className="border p-2 w-full" />
        </div>
        <div className="mb-2">
          <label className="block">Localisation</label>
          <input type="text" value={localisation} onChange={(e) => setLocalisation(e.target.value)} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">As-tu visité ce lieu ?</label>
          <label className="inline-flex items-center mt-2">
            <input type="checkbox" checked={visite} onChange={(e) => setVisite(e.target.checked)} className="mr-2" />
            {visite ? 'Oui' : 'Non'}
          </label>
        </div>
        <div className="mb-4">
          <label className="block">Lien du site</label>
          <input
            type="text"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            className="border p-2 w-full mb-1"
            placeholder="https://..."
          />
          {siteUrl && (
            <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-sm">
              Ouvrir le site
            </a>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Note</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((val) => (
              <FaStar
                key={val}
                size={24}
                className={`cursor-pointer transition ${val <= note ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setNote(val)}
              />
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Images</label>
          {imageUrls.map((url, index) => (
            <div key={index} className="mb-3">
              <img src={url} alt={`Image ${index + 1}`} className="w-full max-w-xs rounded mb-2" />
              <input type="text" value={url} onChange={(e) => modifierImage(index, e.target.value)} className="border p-2 w-full mb-1" />
              <button onClick={() => supprimerImage(index)} className="text-red-500 text-sm hover:underline">
                Supprimer cette image
              </button>
            </div>
          ))}

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={nouvelleImage}
              onChange={(e) => setNouvelleImage(e.target.value)}
              className="border p-2 flex-1"
              placeholder="Ajouter une URL d'image"
            />
            <button onClick={ajouterImage} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Ajouter
            </button>
          </div>
        </div>

        {/* Note libre */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Note libre</label>
          <textarea
            value={noteLibre}
            onChange={(e) => setNoteLibre(e.target.value)}
            rows={5}
            className="border p-2 w-full resize-y"
            placeholder="Prends des notes ici..."
          />
        </div>
      </div>

      {/* Bouton imprimer */}
      <div className="flex items-start mt-4">
        <button
          onClick={imprimerCarte}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          🖨️ Imprimer
        </button>
      </div>
    </div>
  );
};

export default CarteMentale;
