import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationControls from '../components/PaginationControls';

test('renders PaginationControls and handles page changes', () => {
  const onPageChangeMock = jest.fn();

  render(
    <PaginationControls
      page={2}
      totalPages={5}
      risksLength={10}
      onPageChange={onPageChangeMock}
    />
  );

  expect(screen.getByText(/Página 2 de 5/i)).toBeInTheDocument();
  expect(screen.getByText(/10 riesgos mostrados/i)).toBeInTheDocument();

  // Verifica los botones
  const prevButton = screen.getByText(/Anterior/i);
  const nextButton = screen.getByText(/Siguiente/i);
  expect(prevButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
  expect(prevButton).not.toBeDisabled();   expect(nextButton).not.toBeDisabled(); 

  fireEvent.click(prevButton);
  expect(onPageChangeMock).toHaveBeenCalledTimes(1);
  expect(onPageChangeMock).toHaveBeenCalledWith(1);

  fireEvent.click(nextButton);
  expect(onPageChangeMock).toHaveBeenCalledTimes(2);
  expect(onPageChangeMock).toHaveBeenCalledWith(3);
});