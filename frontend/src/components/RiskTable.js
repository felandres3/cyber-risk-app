import React from 'react';

function RiskTable({ risks, search, sortBy, sortDir, onSort }) {
  const highlightText = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200">{part}</span>
      ) : part
    );
  };

  return (
    <table className="w-full max-w-4xl border-collapse bg-white shadow-md rounded-md">
      <thead>
        <tr className="bg-gray-200">
          <th
            className="p-2 border-b cursor-pointer hover:bg-gray-300"
            onClick={() => onSort('id')}
          >
            ID {sortBy === 'id' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </th>
          <th
            className="p-2 border-b cursor-pointer hover:bg-gray-300"
            onClick={() => onSort('title')}
          >
            Título {sortBy === 'title' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </th>
          <th
            className="p-2 border-b cursor-pointer hover:bg-gray-300"
            onClick={() => onSort('description')}
          >
            Descripción {sortBy === 'description' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </th>
          <th
            className="p-2 border-b cursor-pointer hover:bg-gray-300"
            onClick={() => onSort('impact')}
          >
            Impacto {sortBy === 'impact' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </th>
          <th
            className="p-2 border-b cursor-pointer hover:bg-gray-300"
            onClick={() => onSort('probability')}
          >
            Probabilidad {sortBy === 'probability' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </th>
          <th
            className="p-2 border-b cursor-pointer hover:bg-gray-300"
            onClick={() => onSort('category')}
          >
            Categoría {sortBy === 'category' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </th>
          <th
            className="p-2 border-b cursor-pointer hover:bg-gray-300"
            onClick={() => onSort('status')}
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
              {(search) ? 'No se encontraron riesgos' : 'Escribe algo para buscar riesgos'}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default RiskTable;