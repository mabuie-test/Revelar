import React from 'react';

const PhotoGallery = ({ photos }) => {
  if (!photos || photos.count === 0) {
    return (
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Fotos (0)</h3>
        <p className="text-gray-500">Nenhuma foto encontrada</p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">
        Fotos <span className="text-sm font-normal text-gray-600">({photos.count})</span>
      </h3>
      
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {photos.paths.slice(0, 10).map((path, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg shadow">
            <img 
              src={`file://${path}`} 
              alt={`Foto ${index + 1}`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.parentElement.innerHTML = `
                  <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span class="text-gray-500 text-sm">Imagem não disponível</span>
                  </div>
                `;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
