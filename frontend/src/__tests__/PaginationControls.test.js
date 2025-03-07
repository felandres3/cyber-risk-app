import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationControls from '../components/PaginationControls';

test('renders PaginationControls and handles page changes', () => {
  const onPageChangeMock = jest.fn(); // Mock de la función para manejar cambios de página

  // Renderiza el componente con valores iniciales
  render(
    <PaginationControls
      page={2}
      totalPages={5}
      risksLength={10}
      onPageChange={onPageChangeMock}
    />
  );

  // Verifica que el texto de la paginación se renderiza correctamente
  expect(screen.getByText(/Página 2 de 5/i)).toBeInTheDocument();
  expect(screen.getByText(/10 riesgos mostrados/i)).toBeInTheDocument();

  // Obtiene los botones de paginación
  const prevButton = screen.getByText(/Anterior/i);
  const nextButton = screen.getByText(/Siguiente/i);

  // Verifica que los botones existen y están habilitados
  expect(prevButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
  expect(prevButton).not.toBeDisabled();
  expect(nextButton).not.toBeDisabled();

  // Simula clic en el botón "Anterior" y verifica que se llama con la página correcta
  fireEvent.click(prevButton);
  expect(onPageChangeMock).toHaveBeenCalledTimes(1);
  expect(onPageChangeMock).toHaveBeenCalledWith(1);

  // Simula clic en el botón "Siguiente" y verifica que se llama con la página correcta
  fireEvent.click(nextButton);
  expect(onPageChangeMock).toHaveBeenCalledTimes(2);
  expect(onPageChangeMock).toHaveBeenCalledWith(3);
});
