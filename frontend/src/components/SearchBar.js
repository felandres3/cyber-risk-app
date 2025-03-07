import React from 'react';

function SearchBar({ value, onChange }) {
  // Componente de input controlado para búsqueda de riesgos
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Buscar riesgos (ej: ataque)"
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
    />
  );
}

export default SearchBar;