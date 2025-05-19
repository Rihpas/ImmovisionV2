'use client';
import { useRef, useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

interface CarteMentaleProps {
  carte: any;
  onRemove: () => void;
  onSave: (updatedCarte: any) => void;
}

const CarteMentale: React.FC<CarteMentaleProps> = ({ carte, onRemove, onSave }) => {
  const [nomLieu, setNomLieu] = useState(carte.nomLieu);
  const [prix, setPrix] = useState(carte.prix);
  const [metresCarres, setMetresCarres] = useState(carte.metresCarres);
  const [localisation, setLocalisation] = useState(carte.localisation);
  const [imageUrls, setImageUrls] = useState(carte.imageUrls);
  const [siteUrl, setSiteUrl] = useState(carte.siteUrl);
  const [visite, setVisite] = useState(carte.visite);
  const [note, setNote] = useState(carte.note);
  const [noteLibre, setNoteLibre] = useState(carte.noteLibre);
  const [newImageUrl, setNewImageUrl] = useState(''); // champ pour l’ajout de nouvelles images

  const carteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNomLieu(carte.nomLieu);
    setPrix(carte.prix);
    setMetresCarres(carte.metresCarres);
    setLocalisation(carte.localisation);
    setImageUrls(carte.imageUrls);
    setSiteUrl(carte.siteUrl);
    setVisite(carte.visite);
    setNote(carte.note);
    setNoteLibre(carte.noteLibre);
  }, [carte]);

  const handleSave = () => {
    const updatedCarte = {
      ...carte,
      nomLieu,
      prix,
      metresCarres,
      localisation,
      imageUrls,
      siteUrl,
      visite,
      note,
      noteLibre,
    };
    onSave(updatedCarte);
  };

  const imprimerCarte = () => {
    if (!carteRef.current) return;
    const contenu = carteRef.current.cloneNode(true) as HTMLElement;

    contenu.querySelectorAll('input[type="text"]').forEach((el) => {
      const parent = el.parentElement;
      if (parent && parent.querySelector('img')) el.remove();
    });

    contenu.querySelectorAll('button, a').forEach((el) => el.remove());

    contenu.querySelectorAll('input, textarea').forEach((el) => {
      const input = el as HTMLInputElement | HTMLTextAreaElement;
      const span = document.createElement('div');

      if (input instanceof HTMLInputElement && input.type === 'checkbox') {
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

    const yellowStars = contenu.querySelectorAll('.fa-star.text-yellow-400').length;
    const starsContainer = contenu.querySelector('.fa-star')?.parentElement;
    if (starsContainer) {
      const starsText = document.createElement('div');
      starsText.textContent = 'Note : ' + '★'.repeat(yellowStars) + '☆'.repeat(5 - yellowStars);
      starsText.style.marginBottom = '1rem';
      starsContainer.replaceWith(starsText);
    }

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

      const images = printWindow.document.querySelectorAll('img');
      let imagesLoaded = 0;

      images.forEach((img) => {
        img.onload = () => {
          imagesLoaded += 1;
          if (imagesLoaded === images.length) {
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
          }
        };
      });

      if (images.length === 0) {
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  return (
    <div className="border p-4 rounded-lg my-4 shadow-md flex gap-6" ref={carteRef}>
      <div className="flex-1">
        <h3 className="font-bold mb-4">Carte Mentale - Logement</h3>

        <div className="mb-2">
          <label className="block">Nom du lieu</label>
          <input
            type="text"
            value={nomLieu}
            onChange={(e) => setNomLieu(e.target.value)}
            className="border p-2 w-full"
            placeholder="Entrez le nom du lieu"
          />
        </div>

        <div className="mb-2">
          <label className="block">Prix</label>
          <input
            type="text"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            className="border p-2 w-full"
            placeholder="Entrez le prix"
          />
        </div>

        <div className="mb-2">
          <label className="block">Mètres carrés</label>
          <input
            type="text"
            value={metresCarres}
            onChange={(e) => setMetresCarres(e.target.value)}
            className="border p-2 w-full"
            placeholder="Entrez la surface en m²"
          />
        </div>

        <div className="mb-2">
          <label className="block">Localisation</label>
          <input
            type="text"
            value={localisation}
            onChange={(e) => setLocalisation(e.target.value)}
            className="border p-2 w-full"
            placeholder="Entrez l'adresse ou le quartier"
          />
        </div>

        {/* Note */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Note</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((val) => (
              <FaStar
                key={val}
                size={24}
                className={`cursor-pointer transition ${
                  val <= note ? 'text-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => setNote(val)}
              />
            ))}
          </div>
        </div>

        {/* URL du site */}
        <div className="mb-4">
          <label className="block">URL du site</label>
          <input
            type="text"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            className="border p-2 w-full"
            placeholder="https://exemple.com"
          />
          {siteUrl && (
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-1 inline-block"
            >
              Visiter le site
            </a>
          )}
        </div>

        {/* Notes libres */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Note libre</label>
          <textarea
            value={noteLibre}
            onChange={(e) => setNoteLibre(e.target.value)}
            rows={4}
            className="border p-2 w-full resize-y"
            placeholder="Prends des notes ici..."
          />
        </div>

        {/* Image URLs */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Images</label>
          {imageUrls.map((url, index) => (
            <div key={index} className="mb-3">
              <img src={url} alt={`Image ${index + 1}`} className="w-full max-w-xs rounded mb-2" />
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  const updatedUrls = [...imageUrls];
                  updatedUrls[index] = e.target.value;
                  setImageUrls(updatedUrls);
                }}
                className="border p-2 w-full mb-1"
              />
              <button
                onClick={() => {
                  const updatedUrls = imageUrls.filter((_, i) => i !== index);
                  setImageUrls(updatedUrls);
                }}
                className="text-red-500 text-sm hover:underline"
              >
                Supprimer cette image
              </button>
            </div>
          ))}

          {/* Ajout nouvelle image */}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="border p-2 flex-1"
              placeholder="Ajouter une URL d'image"
            />
            <button
              onClick={() => {
                if (newImageUrl.trim() !== '') {
                  setImageUrls([...imageUrls, newImageUrl.trim()]);
                  setNewImageUrl('');
                }
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Ajouter
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sauvegarder les informations
          </button>
          <button
            onClick={onRemove}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>

        <div className="flex items-start mt-4">
          <button
            onClick={imprimerCarte}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            🖨️ Imprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarteMentale;
