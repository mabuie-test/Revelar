import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configuração do ícone do marcador
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = ({ locations }) => {
  return (
    <div className="h-96 w-full">
      <MapContainer 
        center={[-15.788, -47.879]} 
        zoom={4} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {locations.map((location, index) => (
          location.lat && location.lng && (
            <Marker 
              key={index} 
              position={[location.lat, location.lng]}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">Dispositivo: {location.deviceInfo?.model}</h3>
                  <p>Data: {new Date(location.timestamp).toLocaleString()}</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
