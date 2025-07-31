import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para ícones
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapView = ({ locations }) => {
  return (
    <Map 
      center={[-15.788, -47.879]} 
      zoom={4}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {locations.map((location, index) => (
        location.lat && location.lng && (
          <Marker key={index} position={[location.lat, location.lng]}>
            <Popup>
              <div>
                <h3 className="font-bold">Dispositivo: {location.deviceInfo?.model}</h3>
                <p>Data: {new Date(location.timestamp).toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        )
      ))}
    </Map>
  );
};

export default MapView;
