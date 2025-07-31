import React, { useState } from 'react';

const DataTable = ({ data, type }) => {
  const [expanded, setExpanded] = useState(false);
  
  const renderContent = () => {
    if (!data) return null;
    
    switch(type) {
      case 'sms':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Número</th>
                  <th className="py-2 px-4 border-b">Mensagem</th>
                  <th className="py-2 px-4 border-b">Data</th>
                </tr>
              </thead>
              <tbody>
                {data.messages.slice(0, expanded ? data.messages.length : 5).map((sms, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-2 px-4 border-b">{sms.address}</td>
                    <td className="py-2 px-4 border-b">{sms.body}</td>
                    <td className="py-2 px-4 border-b">{new Date(sms.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        
      case 'calls':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Número</th>
                  <th className="py-2 px-4 border-b">Duração</th>
                  <th className="py-2 px-4 border-b">Tipo</th>
                  <th className="py-2 px-4 border-b">Data</th>
                </tr>
              </thead>
              <tbody>
                {data.logs.slice(0, expanded ? data.logs.length : 5).map((call, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-2 px-4 border-b">{call.number}</td>
                    <td className="py-2 px-4 border-b">{call.duration}s</td>
                    <td className="py-2 px-4 border-b">
                      {call.type === '1' ? 'Entrada' : call.type === '2' ? 'Perdida' : 'Saída'}
                    </td>
                    <td className="py-2 px-4 border-b">{new Date(call.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">
          {type === 'sms' ? 'SMS' : 'Chamadas'} 
          <span className="ml-2 text-sm font-normal text-gray-600">
            ({data?.count || 0} registros)
          </span>
        </h3>
        {data && data.count > 5 && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {expanded ? 'Mostrar menos' : 'Mostrar todos'}
          </button>
        )}
      </div>
      {renderContent()}
    </div>
  );
};

export default DataTable;
