import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

test('renders SearchBar and calls onChange with correct value', () => {
  const onChangeMock = jest.fn();
  
  const Wrapper = () => {
    const [search, setSearch] = useState("test");
    return <SearchBar value={search} onChange={(e) => {
      setSearch(e.target.value); 
      onChangeMock(e);
    }} />;
  };

  render(<Wrapper />);

  const input = screen.getByPlaceholderText(/Buscar riesgos/i);
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('test');

  fireEvent.change(input, { target: { value: 'nuevo' } });

  expect(onChangeMock).toHaveBeenCalledTimes(1); 
  expect(input).toHaveValue('nuevo'); 
});
