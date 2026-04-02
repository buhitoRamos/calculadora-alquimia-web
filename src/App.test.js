import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the calculator', () => {
  render(<App />);
  expect(screen.getByText(/Calculadora Alquimia/i)).toBeInTheDocument();
});
