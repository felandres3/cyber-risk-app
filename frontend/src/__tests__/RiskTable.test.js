import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RiskTable from '../components/RiskTable';

test('renders RiskTable and calls onSort when clicking a header', () => {
  // Mock para rastrear las llamadas a onSort
  const onSortMock = jest.fn();
  // Datos simulados para probar la renderización
  const risks = [
    { id: 1, title: 'Test Risk', description: 'Desc', impact: 3, probability: 4, category: 'Cat', status: 'Open' }
  ];

  render(
    <RiskTable
      risks={risks}
      search="Test"
      sortBy="id"
      sortDir="asc"
      onSort={onSortMock}
    />
  );

  // Verifica que los datos se rendericen correctamente
  expect(screen.getByText((content, element) => element.textContent === 'Test Risk')).toBeInTheDocument();
  expect(screen.getByText('Desc')).toBeInTheDocument();

  // Verifica que el texto buscado esté resaltado
  const highlighted = screen.getByText('Test');
  expect(highlighted).toHaveClass('bg-yellow-200');

  // Busca el encabezado "ID" específico dentro de los elementos th
  const idHeaders = screen.getAllByText(/ID/i);
  const idHeader = idHeaders.find((el) => el.tagName === "TH");

  // Simula un clic en el encabezado y verifica que se llame a onSort
  fireEvent.click(idHeader);
  expect(onSortMock).toHaveBeenCalledTimes(1);
  expect(onSortMock).toHaveBeenCalledWith('id');
});