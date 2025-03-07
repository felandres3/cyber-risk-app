import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

test('renders SearchBar and calls onChange with correct value', () => {
  // Mock para rastrear las llamadas a onChange
  const onChangeMock = jest.fn();

  // Componente envoltorio para manejar estado y props
  const Wrapper = () => {
    const [search, setSearch] = useState('test');
    return <SearchBar value={search} onChange={(e) => {
      setSearch(e.target.value);
      onChangeMock(e);
    }} />;
  };

  render(<Wrapper />);

  // Verifica que el input se renderice y tenga el valor inicial
  const input = screen.getByPlaceholderText(/Buscar riesgos/i);
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('test');

  // Simula un cambio en el input y verifica el resultado
  fireEvent.change(input, { target: { value: 'nuevo' } });

  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(input).toHaveValue('nuevo');
});