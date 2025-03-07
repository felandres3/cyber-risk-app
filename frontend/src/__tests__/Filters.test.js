import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../components/Filters';

test('renders Filters and calls onIdChange with correct value', () => {
  const onIdChangeMock = jest.fn(); // Mock para la función de cambio de ID

  // Componente Wrapper para manejar el estado del input ID
  const Wrapper = () => {
    const [idValue, setIdValue] = useState(''); // Estado para el ID

    return (
      <Filters
        idValue={idValue} // Valor controlado del input ID
        onIdChange={(e) => {
          setIdValue(e.target.value); // Actualiza el estado con el nuevo valor
          onIdChangeMock(e); // Llama a la función mock para verificar la ejecución
        }}
        impactValue=""
        onImpactChange={() => {}} // Mock vacío para otras props no relevantes en este test
        probabilityValue=""
        onProbabilityChange={() => {}}
        perPage={10}
        onPerPageChange={() => {}}
      />
    );
  };

  render(<Wrapper />);

  // Obtiene el input de ID por su placeholder
  const idInput = screen.getByPlaceholderText(/ID/i);

  // Verifica que el input existe en el documento y su valor inicial es null
  expect(idInput).toBeInTheDocument();
  expect(idInput).toHaveValue(null); // Verificación inicial del valor del input

  // Simula un cambio en el input de ID
  fireEvent.change(idInput, { target: { value: '123' } });

  // Verifica que la función `onIdChangeMock` fue llamada una vez
  expect(onIdChangeMock).toHaveBeenCalledTimes(1);

  // Verifica que el valor del input se haya actualizado correctamente
  expect(idInput).toHaveValue(123); 
});
