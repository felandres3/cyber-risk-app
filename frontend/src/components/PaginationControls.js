import React from 'react';

function PaginationControls({ page, totalPages, risksLength, onPageChange }) {
  return (
    <div className="mt-4 flex gap-4 items-center">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
      >
        Anterior
      </button>
      <span className="text-gray-700">
        Página {page} de {totalPages} ({risksLength} riesgos mostrados)
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
      >
        Siguiente
      </button>
    </div>
  );
}

export default PaginationControls;