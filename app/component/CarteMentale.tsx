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

  // Clone pour pouvoir manipuler sans modifier le visuel de la page
  const contenu = carteRef.current.cloneNode(true) as HTMLElement;

  // Nettoyage des images : on garde les <img>, on supprime les <input> URL
  contenu.querySelectorAll('input[type="text"]').forEach((el) => {
    const parent = el.parentElement;
    if (parent && parent.querySelector('img')) {
      el.remove(); // c'est une URL d'image : on ne la garde pas
    }
  });

  // Supprimer tous les boutons et liens inutiles (ajouter, supprimer, ouvrir lien, imprimer)
  contenu.querySelectorAll('button, a').forEach((btn) => btn.remove());

  // Remplacer les champs texte restants (input & textarea) par leur contenu brut
  contenu.querySelectorAll('input, textarea').forEach((el) => {
    const input = el as HTMLInputElement | HTMLTextAreaElement;
    const span = document.createElement('div');

    if (input instanceof HTMLInputElement && input.type === 'checkbox') {
      // Pour les checkboxes, afficher "Oui" ou "Non" seulement 1 fois
      const parent = input.closest('label');
      if (parent) {
        const output = document.createElement('div');
        output.textContent = input.checked ? 'Oui' : 'Non';
        parent.replaceWith(output);
      }
    } else {
      span.textContent = input.value;
      span.style.marginBottom = '0.5rem';
      input.replaceWith(span);
    }
  });

  // Remplacer les étoiles FaStar par du texte ★★★☆☆
  const yellowStars = contenu.querySelectorAll('.fa-star.text-yellow-400').length;
  const starsContainer = contenu.querySelector('.fa-star')?.parentElement;
  if (starsContainer) {
    const starsText = document.createElement('div');
    starsText.textContent = 'Note : ' + '★'.repeat(yellowStars) + '☆'.repeat(5 - yellowStars);
    starsText.style.marginBottom = '1rem';
    starsContainer.replaceWith(starsText);
  }

  // Imprimer dans une nouvelle fenêtre
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Impression Carte Mentale</title>
          <style>
            body { font-family: sans-serif; padding: 20px; color: #000; }
            img { max-width: 100%; height: auto; margin-bottom: 1rem; }
            h3 { font-size: 1.25rem; margin-bottom: 1rem; }
            div { margin-bottom: 0.75rem; }
          </style>
        </head>
        <body>${contenu.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
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
