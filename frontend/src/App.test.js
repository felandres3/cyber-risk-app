import { render, screen } from '@testing-library/react';
import App from './App';

// Define un test para verificar que el componente App renderiza un enlace específico
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Gestión de Riesgos/i);
  expect(linkElement).toBeInTheDocument();
});
