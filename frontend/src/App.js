import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('');
  const [idFilter, setIdFilter] = useState('');
  const [impactFilter, setImpactFilter] = useState(''); // Mantiene el valor como string vacío por default
  const [probabilityFilter, setProbabilityFilter] = useState(''); // Igual aquí
  const [risks, setRisks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRisks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/risks?search=${search}&id=${idFilter}&impact=${impactFilter}&probability=${probabilityFilter}&page=${page}&per_page=10`
      );
      setRisks(response.data.risks);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching risks:', error);
      setRisks([]);
    }
  };

  useEffect(() => {
    fetchRisks();
  }, [search, idFilter, impactFilter, probabilityFilter, page]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleIdFilter = (e) => {
    setIdFilter(e.target.value);
    setPage(1);
  };

  const handleImpactFilter = (e) => {
    setImpactFilter(e.target.value);
    setPage(1);
  };

  const handleProbabilityFilter = (e) => {
    setProbabilityFilter(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Gestión de Riesgos</h1>
      <div className="flex flex-col gap-4 mb-4 w-full max-w-md">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Buscar riesgos (ej: ataque)"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4">
          <input
            type="number"
            value={idFilter}
            onChange={handleIdFilter}
            placeholder="ID"
            className="w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={impactFilter}
            onChange={handleImpactFilter}
            className="w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Impacto</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select
            value={probabilityFilter}
            onChange={handleProbabilityFilter}
            className="w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Probabilidad</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
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
          {risks.length > 0 ? (
            risks.map(risk => (
              <tr key={risk.id}>
                <td className="p-2 border-b">{risk.id}</td>
                <td className="p-2 border-b">{risk.title}</td>
                <td className="p-2 border-b">{risk.description}</td>
                <td className="p-2 border-b">{risk.impact}</td>
                <td className="p-2 border-b">{risk.probability}</td>
                <td className="p-2 border-b">{risk.category}</td>
                <td className="p-2 border-b">{risk.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-4 text-center text-gray-500">
                {(search || idFilter || impactFilter || probabilityFilter) ? 'No se encontraron riesgos' : 'Escribe algo para buscar riesgos'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4 flex gap-4 items-center">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          Anterior
        </button>
        <span className="text-gray-700">
          Página {page} de {totalPages} ({risks.length} riesgos mostrados)
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default App;