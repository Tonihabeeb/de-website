import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '400px' };
const center = { lat: 36.191856681457985, lng: 43.968337343201846 };

export default function GoogleOfficeMap() {
  const [icon, setIcon] = useState(null);

  const handleMapLoad = () => {
    if (window.google) {
      setIcon({
        url: '/Map-Pin.png',
        scaledSize: new window.google.maps.Size(48, 48),
        anchor: new window.google.maps.Point(24, 48),
      });
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}
        onLoad={handleMapLoad}
      >
        {icon && (
          <Marker
            position={center}
            icon={icon}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
} 