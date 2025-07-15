'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import offices from '@/static/offices';
import { useEffect } from 'react';

// Fix icon paths for Leaflet in Next.js
const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function OfficeMap() {
  const center: [number, number] = [33.2232, 43.6793]; // Center of Iraq

  // Ensure map is keyboard focusable
  useEffect(() => {
    const mapContainer = document.querySelector('.office-map');
    if (mapContainer) {
      (mapContainer as HTMLElement).setAttribute('tabindex', '0');
    }
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={6}
      className="office-map w-full h-64 rounded-lg"
      keyboard={true}
      aria-label="Map showing Deep Engineering office locations"
      role="application"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {offices.map(office => (
        <Marker key={office.id} position={office.position} icon={markerIcon} title={office.name}>
          <Popup>{office.name}<br />{office.address}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
