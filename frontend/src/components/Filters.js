import React from 'react';

function Filters({ idValue, onIdChange, impactValue, onImpactChange, probabilityValue, onProbabilityChange, perPage, onPerPageChange }) {
  // Componente para filtrar riesgos por ID, impacto, probabilidad y cantidad por página
  return (
    <div className="flex flex-col gap-4 mb-4 w-full max-w-md">
      <div className="flex gap-4">
        <input
          type="number"
          value={idValue}
          onChange={onIdChange}
          placeholder="ID"
          className="w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={impactValue}
          onChange={onImpactChange}
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
          value={probabilityValue}
          onChange={onProbabilityChange}
          className="w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Probabilidad</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <select
          value={perPage}
          onChange={onPerPageChange}
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

export default Filters;