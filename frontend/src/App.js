import React, { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Gestión de Riesgos</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Buscar riesgos (ej: ataque)"
        className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <table className="w-full max-w-4xl border-collapse bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Título</th>
            <th className="p-2 border-b">Descripción</th>
            <th className="p-2 border-b">Impacto</th>
            <th className="p-2 border-b">Probabilidad</th>
            <th className="p-2 border-b">Categoría</th>
            <th className="p-2 border-b">Estado</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí irán los riesgos después */}
          <tr>
            <td colSpan="7" className="p-4 text-center text-gray-500">
              Escribe algo para buscar riesgos
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;