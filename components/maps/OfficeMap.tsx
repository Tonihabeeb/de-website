'use client';

import { useEffect, useState } from 'react';
import offices from '@/static/offices';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: '/Map-Pin.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: 'custom-map-pin',
});

export default function OfficeMap() {
  const center: [number, number] = [33.2232, 43.6793]; // Center of Iraq
  const zoom = 6;

  return (
    <div className='office-map w-full h-64 rounded-lg overflow-hidden relative'>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '220px',
          borderRadius: '0.5rem',
        }}
        aria-label='Map showing Deep Engineering office locations'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {offices.map(office => (
          <Marker key={office.id} position={office.position} icon={customIcon}>
            <Popup>
              <strong>{office.name}</strong>
              <br />
              {office.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
