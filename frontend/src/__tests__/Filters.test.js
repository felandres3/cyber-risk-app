import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../components/Filters';

test('renders Filters and calls onIdChange with correct value', () => {
  const onIdChangeMock = jest.fn();

  const Wrapper = () => {
    const [idValue, setIdValue] = useState(''); 
    return (
      <Filters
        idValue={idValue}
        onIdChange={(e) => {
          setIdValue(e.target.value);
          onIdChangeMock(e);
        }}
        impactValue=""
        onImpactChange={() => {}}
        probabilityValue=""
        onProbabilityChange={() => {}}
        perPage={10}
        onPerPageChange={() => {}}
      />
    );
  };

  render(<Wrapper />);

  const idInput = screen.getByPlaceholderText(/ID/i);
  expect(idInput).toBeInTheDocument();
  expect(idInput).toHaveValue(null); 

  fireEvent.change(idInput, { target: { value: '123' } });
  expect(onIdChangeMock).toHaveBeenCalledTimes(1);
  expect(idInput).toHaveValue(123); 
});
