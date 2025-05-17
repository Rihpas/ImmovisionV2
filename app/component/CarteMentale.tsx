'use client';

import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

interface Carte {
  nomLieu: string;
  prix: string;
  metresCarres: string;
  localisation: string;
  siteUrl: string;
  visite: boolean;
  note: number;
  noteLibre: string;
  imageUrls: string[];
}

interface CarteMentaleProps {
  carte?: Partial<Carte>; // carte optionnelle pour nouvelle carte ou édition
  onRemove: () => void;
  onSave: (carte: Carte) => void;
}

const CarteMentale: React.FC<CarteMentaleProps> = ({ carte = {}, onRemove, onSave }) => {
  const [nomLieu, setNomLieu] = useState(carte.nomLieu || '');
  const [prix, setPrix] = useState(carte.prix || '');
  const [metresCarres, setMetresCarres] = useState(carte.metresCarres || '');
  const [localisation, setLocalisation] = useState(carte.localisation || '');
  const [siteUrl, setSiteUrl] = useState(carte.siteUrl || '');
  const [visite, setVisite] = useState(carte.visite || false);
  const [note, setNote] = useState(carte.note || 0);
  const [noteLibre, setNoteLibre] = useState(carte.noteLibre || '');
  const [imageUrls, setImageUrls] = useState<string[]>(carte.imageUrls || []);
  const [nouvelleImage, setNouvelleImage] = useState('');

  // Met à jour les états si la carte change (utile pour édition)
  useEffect(() => {
    setNomLieu(carte.nomLieu || '');
    setPrix(carte.prix || '');
    setMetresCarres(carte.metresCarres || '');
    setLocalisation(carte.localisation || '');
    setSiteUrl(carte.siteUrl || '');
    setVisite(carte.visite || false);
    setNote(carte.note || 0);
    setNoteLibre(carte.noteLibre || '');
    setImageUrls(carte.imageUrls || []);
  }, [carte]);

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

  const enregistrerCarte = () => {
    // Validation basique (tu peux améliorer)
    if (!nomLieu.trim()) {
      alert('Le nom du lieu est obligatoire');
      return;
    }
    const nouvelleCarte: Carte = {
      nomLieu,
      prix,
      metresCarres,
      localisation,
      siteUrl,
      visite,
      note,
      noteLibre,
      imageUrls,
    };
    onSave(nouvelleCarte);
  };

  return (
    <div className="border p-4 rounded-lg my-4 shadow-md bg-white text-black">
      <h3 className="font-bold mb-2">Carte Mentale - Logement</h3>

      <label>Nom du lieu</label>
      <input
        className="border p-2 w-full mb-2"
        value={nomLieu}
        onChange={(e) => setNomLieu(e.target.value)}
      />

      <label>Prix</label>
      <input
        className="border p-2 w-full mb-2"
        value={prix}
        onChange={(e) => setPrix(e.target.value)}
      />

      <label>Mètres carrés</label>
      <input
        className="border p-2 w-full mb-2"
        value={metresCarres}
        onChange={(e) => setMetresCarres(e.target.value)}
      />

      <label>Localisation</label>
      <input
        className="border p-2 w-full mb-2"
        value={localisation}
        onChange={(e) => setLocalisation(e.target.value)}
      />

      <label>As-tu visité ce lieu ?</label>
      <label className="block mb-2">
        <input
          type="checkbox"
          checked={visite}
          onChange={(e) => setVisite(e.target.checked)}
        />{' '}
        {visite ? 'Oui' : 'Non'}
      </label>

      <label>Lien du site</label>
      <input
        className="border p-2 w-full mb-2"
        value={siteUrl}
        onChange={(e) => setSiteUrl(e.target.value)}
      />

      <label>Note</label>
      <div className="flex mb-2">
        {[1, 2, 3, 4, 5].map((val) => (
          <FaStar
            key={val}
            size={24}
            className={`cursor-pointer ${val <= note ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => setNote(val)}
          />
        ))}
      </div>

      <label>Images</label>
      {imageUrls.map((url, idx) => (
        <div key={idx} className="mb-2">
          <img src={url} alt={`image-${idx}`} className="w-full max-w-xs rounded" />
          <button
            onClick={() => supprimerImage(idx)}
            className="text-red-500 text-sm"
            type="button"
          >
            Supprimer
          </button>
        </div>
      ))}

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="URL image"
          value={nouvelleImage}
          onChange={(e) => setNouvelleImage(e.target.value)}
        />
        <button
          onClick={ajouterImage}
          className="bg-green-500 text-white px-4 py-2 rounded"
          type="button"
        >
          Ajouter
        </button>
      </div>

      <label>Note libre</label>
      <textarea
        className="border p-2 w-full mb-2"
        rows={4}
        value={noteLibre}
        onChange={(e) => setNoteLibre(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          onClick={enregistrerCarte}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="button"
        >
          Enregistrer
        </button>
        <button
          onClick={onRemove}
          className="bg-red-600 text-white px-4 py-2 rounded"
          type="button"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default CarteMentale;
