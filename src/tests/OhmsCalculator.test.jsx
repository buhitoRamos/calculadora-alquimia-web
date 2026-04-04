import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OhmsCalculator from '../components/Ohms-calculator/OhmsCalculator';
import { confirmAlert } from 'react-confirm-alert';

// Mock react-confirm-alert
jest.mock('react-confirm-alert', () => ({
  confirmAlert: jest.fn(),
}));

describe('OhmsCalculator', () => {
  beforeEach(() => {
    confirmAlert.mockClear(); // Clear mock calls before each test
  });

  test('should calculate amperage when voltage and ohms are provided', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' });
    fireEvent.change(voltInput, { target: { value: '12' } });
    const ohmsInput = screen.getByRole('spinbutton', { name: 'OHMS' });
    fireEvent.change(ohmsInput, { target: { value: '6' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(`Amper: 2.00
Ohms: 6.00
Watt: 24.00
Volt: 12.00`);
  });

  test('should calculate wattage when voltage and amper are provided', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' });
    fireEvent.change(voltInput, { target: { value: '12' } });
    const ampInput = screen.getByRole('spinbutton', { name: 'AMPER' });
    fireEvent.change(ampInput, { target: { value: '2' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(`Amper: 2.00
Ohms: 6.00
Watt: 24.00
Volt: 12.00`);
  });

  test('should calculate ohms when voltage and watt are provided', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' });
    fireEvent.change(voltInput, { target: { value: '12' } });
    const wattInput = screen.getByRole('spinbutton', { name: 'WATT' });
    fireEvent.change(wattInput, { target: { value: '24' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(`Amper: 2.00
Ohms: 6.00
Watt: 24.00
Volt: 12.00`);
  });

  test('should handle clear button', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' });
    fireEvent.change(voltInput, { target: { value: '12' } });
    const ohmsInput = screen.getByRole('spinbutton', { name: 'OHMS' });
    fireEvent.change(ohmsInput, { target: { value: '6' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(`Amper: 2.00
Ohms: 6.00
Watt: 24.00
Volt: 12.00`);
    fireEvent.click(screen.getByText('Reset'));
    expect(voltInput).toHaveDisplayValue('');
    expect(ohmsInput).toHaveDisplayValue('');
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(''); // Clear result text area
  });

  test('should handle invalid input for voltage', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' });
    fireEvent.change(voltInput, { target: { value: 'abc' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(''); // Expect empty result
  });

  test('should handle invalid input for ohms', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' });
    fireEvent.change(voltInput, { target: { value: '12' } });
    const ohmsInput = screen.getByRole('spinbutton', { name: 'OHMS' });
    fireEvent.change(ohmsInput, { target: { value: 'abc' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(''); // Expect empty result
  });

  test('should handle invalid input for watt', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' });
    fireEvent.change(voltInput, { target: { value: '12' } });
    const wattInput = screen.getByRole('spinbutton', { name: 'WATT' }); // Changed to getByRole with name
    fireEvent.change(wattInput, { target: { value: 'abc' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(''); // Expect empty result
  });

  test('should handle empty input for voltage', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' });
    fireEvent.change(voltInput, { target: { value: '' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue('');
  });

  test('should handle empty input for ohms', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' });
    fireEvent.change(voltInput, { target: { value: '12' } });
    const ohmsInput = screen.getByRole('spinbutton', { name: 'OHMS' });
    fireEvent.change(ohmsInput, { target: { value: '' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue('');
  });

  test('should handle empty input for watt', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' });
    fireEvent.change(voltInput, { target: { value: '12' } });
    const wattInput = screen.getByRole('spinbutton', { name: 'WATT' });
    fireEvent.change(wattInput, { target: { value: '' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue('');
  });

  test('should handle zero input for voltage', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' }); // Changed to getByRole with name
    fireEvent.change(voltInput, { target: { value: '0' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue('');
  });

  test('should handle zero input for ohms', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' });
    fireEvent.change(voltInput, { target: { value: '12' } });
    const ohmsInput = screen.getByRole('spinbutton', { name: 'OHMS' });
    fireEvent.change(ohmsInput, { target: { value: '0' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue('');
  });

  test('should handle zero input for watt', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' });
    fireEvent.change(voltInput, { target: { value: '12' } });
    const wattInput = screen.getByRole('spinbutton', { name: 'WATT' });
    fireEvent.change(wattInput, { target: { value: '0' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue('');
  });

  test('should handle decimal input for voltage', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' });
    fireEvent.change(voltInput, { target: { value: '12.5' } });
    const ohmsInput = screen.getByRole('spinbutton', { name: 'OHMS' });
    fireEvent.change(ohmsInput, { target: { value: '6' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(`Amper: 2.08
Ohms: 6.00
Watt: 26.04
Volt: 12.50`);
  });

  test('should handle decimal input for ohms', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' });
    fireEvent.change(voltInput, { target: { value: '12' } });
    const ohmsInput = screen.getByRole('spinbutton', { name: 'OHMS' });
    fireEvent.change(ohmsInput, { target: { value: '6.5' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(`Amper: 1.85
Ohms: 6.50
Watt: 22.15
Volt: 12.00`);
  });

  test('should handle decimal input for watt', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByRole('spinbutton', { name: 'VOLTIOS' });
    fireEvent.change(voltInput, { target: { value: '12' } });
    const wattInput = screen.getByRole('spinbutton', { name: 'WATT' });
    fireEvent.change(wattInput, { target: { value: '24.5' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByRole('textbox', { name: 'Ley de Ohm' })).toHaveValue(`Amper: 2.04
Ohms: 5.88
Watt: 24.50
Volt: 12.00`);
  });
});
