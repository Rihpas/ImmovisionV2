'use client';

import { useState } from 'react';
import CarteMentale from '../component/CarteMentale' ; 

export default function DashboardPage() {
    const [cartes, setCartes] = useState<number[]>([]);

    const ajouterCarte = () => {
        setCartes((prev) => [...prev, Date.now()]); // Date.now pour une key unique
    };

    const supprimerCarte = (keyToRemove: number) => {
        setCartes(cartes.filter((key) => key !== keyToRemove));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Bienvenue sur votre portail</h2>
            <p className="mb-4">Données chargées avec succès !</p>

            {cartes.map((key) => (
                <CarteMentale key={key} onRemove={() => supprimerCarte(key)} />
            ))}

            <button
                onClick={ajouterCarte}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                + Ajouter une carte
            </button>
        </div>
    );
}