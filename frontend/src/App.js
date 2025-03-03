import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('');
  const [idFilter, setIdFilter] = useState('');
  const [impactFilter, setImpactFilter] = useState('');
  const [probabilityFilter, setProbabilityFilter] = useState('');
  const [risks, setRisks] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [sortDir, setSortDir] = useState('asc');

  const fetchRisks = async () => {
    try {
      const url = `http://localhost:5000/risks?search=${search}&id=${idFilter}&impact=${impactFilter}&probability=${probabilityFilter}&page=${page}&per_page=${perPage}&sort_by=${sortBy}&sort_dir=${sortDir}`;
      console.log('Fetching URL:', url);
      const response = await axios.get(url);
      setRisks(response.data.risks);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching risks:', error);
      setRisks([]);
    }
  };

  useEffect(() => {
    fetchRisks();
  }, [search, idFilter, impactFilter, probabilityFilter, page, perPage, sortBy, sortDir]);

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

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('asc');
    }
    setPage(1);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPage(1);
  };

  // Función para resaltar texto
  const highlightText = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200">{part}</span>
      ) : (
        part
      )
    );
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
            <th
              className="p-2 border-b cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('id')}
            >
              ID {sortBy === 'id' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th
              className="p-2 border-b cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('title')}
            >
              Título {sortBy === 'title' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th
              className="p-2 border-b cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('description')}
            >
              Descripción {sortBy === 'description' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th
              className="p-2 border-b cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('impact')}
            >
              Impacto {sortBy === 'impact' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th
              className="p-2 border-b cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('probability')}
            >
              Probabilidad {sortBy === 'probability' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th
              className="p-2 border-b cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('category')}
            >
              Categoría {sortBy === 'category' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th
              className="p-2 border-b cursor-pointer hover:bg-gray-300"
              onClick={() => handleSort('status')}
            >
              Estado {sortBy === 'status' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {risks.length > 0 ? (
            risks.map(risk => (
              <tr key={risk.id}>
                <td className="p-2 border-b">{risk.id}</td>
                <td className="p-2 border-b">{highlightText(risk.title, search)}</td>
                <td className="p-2 border-b">{highlightText(risk.description, search)}</td>
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
        <select
          value={perPage}
          onChange={handlePerPageChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="10">10 por página</option>
          <option value="20">20 por página</option>
          <option value="50">50 por página</option>
        </select>
      </div>
    </div>
  );
}

export default App;