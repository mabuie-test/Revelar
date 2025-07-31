import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Stealth Monitor</h1>
        </div>
      </header>
      
      <main>
        <Dashboard />
      </main>
      
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>Sistema de Monitoramento - {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
