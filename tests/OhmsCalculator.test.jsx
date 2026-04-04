import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OhmsCalculator from '../src/components/Ohms-calculator/OhmsCalculator';

import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert

// Mock react-confirm-alert
jest.mock('react-confirm-alert', () => ({
  confirmAlert: jest.fn(),
}));

describe('OhmsCalculator', () => {
  beforeEach(() => {
    confirmAlert.mockClear(); // Clear mock calls before each test
  });

  test('renders the component with default values', () => {
    render(<OhmsCalculator />);
    expect(screen.getByText(/Ley de Ohm/i)).toBeInTheDocument(); // Expect the header text
    expect(screen.getAllByPlaceholderText(/ingrese valor/i)[0]).toHaveValue('');
    expect(screen.getAllByPlaceholderText(/ingrese valor/i)[1]).toHaveValue('');
  });

  test('calculates amperage when voltage and ohms are provided', () => {
    render(<OhmsCalculator />);
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[0], { target: { value: '12' } }); // VOLTIOS
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[2], { target: { value: '3' } }); // OHMS
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(` Amper: 4.00
Ohms: 3.00
Watt: 48.00
Volt: 12.00`);
  });

  test('calculates resistance when voltage and power are provided', () => {
    render(<OhmsCalculator />);
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[0], { target: { value: '12' } }); // VOLTIOS
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[1], { target: { value: '144' } }); // WATT
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(` Amper: 12.00
Ohms: 1.00
Watt: 144.00
Volt: 12.00`);
  });

  test('calculates power when current and resistance are provided', () => {
    render(<OhmsCalculator />);
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[2], { target: { value: '3' } }); // OHMS
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[3], { target: { value: '10' } }); // AMPER
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(` Amper: 10.00
Ohms: 3.00
Watt: 300.00
Volt: 30.00`);
  });

  test('calculates voltage when current and resistance are provided', () => {
    render(<OhmsCalculator />);
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[2], { target: { value: '144' } }); // OHMS
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[3], { target: { value: '10' } }); // AMPER
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(` Amper: 10.00
Ohms: 144.00
Watt: 14400.00
Volt: 1440.00`);
  });

  test('displays error message when less than 2 values are provided', () => {
    render(<OhmsCalculator />);
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[0], { target: { value: '12' } });
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(confirmAlert).toHaveBeenCalledTimes(1);
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Se denbe ingresar solo 2 valores para calcular el resto',
    }));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(''); // Result should be cleared
  });

  test('clears form and result on clear button click', () => {
    render(<OhmsCalculator />);
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[0], { target: { value: '12' } });
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[2], { target: { value: '3' } });
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(` Amper: 4.00
Ohms: 3.00
Watt: 48.00
Volt: 12.00`);
    fireEvent.click(screen.getByText(/Limpiar/i));
    expect(screen.getAllByPlaceholderText(/ingrese valor/i)[0]).toHaveValue('');
    expect(screen.getAllByPlaceholderText(/ingrese valor/i)[1]).toHaveValue('');
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(''); // Result should be cleared
  });
});
