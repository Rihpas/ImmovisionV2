'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Corrige l’icône des marqueurs (important pour affichage correct)
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

export default function MapPage() {
  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[43.927822, 2.144964]} 
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Exemple de marqueur */}
        <Marker position={[48.8566, 2.3522]}>
          <Popup>
            📍 Bien immobilier à Paris <br /> Cliquez pour en savoir plus.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
