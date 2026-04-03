import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OhmsCalculator from '../components/Ohms-calculator/OhmsCalculator';

describe('OhmsCalculator', () => {
  test('should calculate amperage when voltage and ohms are provided', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: '12' } });
    const ohmsInput = screen.getByLabelText(/ohms/i);
    fireEvent.change(ohmsInput, { target: { value: '6' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByText('Amper: 2')).toBeInTheDocument();
  });

  test('should calculate wattage when voltage and amper are provided', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: '12' } });
    const ampInput = screen.getByLabelText(/amper/i);
    fireEvent.change(ampInput, { target: { value: '2' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByText('Watt: 24')).toBeInTheDocument();
  });

  test('should calculate ohms when voltage and watt are provided', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: '12' } });
    const wattInput = screen.getByLabelText(/watt/i);
    fireEvent.change(wattInput, { target: { value: '24' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByText('Ohms: 6')).toBeInTheDocument();
  });

  test('should handle clear button', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: '12' } });
    const ohmsInput = screen.getByLabelText(/ohms/i);
    fireEvent.change(ohmsInput, { target: { value: '6' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByText('Amper: 2')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Limpiar'));
    expect(voltInput.value).toBe('');
    expect(ohmsInput.value).toBe('');
    expect(screen.queryByText('Amper: 2')).not.toBeInTheDocument();
  });

  test('should handle invalid input for voltage', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: 'abc' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.queryByText('Amper: 2')).not.toBeInTheDocument();
  });

  test('should handle invalid input for ohms', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: '12' } });
    const ohmsInput = screen.getByLabelText(/ohms/i);
    fireEvent.change(ohmsInput, { target: { value: 'abc' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.queryByText('Amper: 2')).not.toBeInTheDocument();
  });

  test('should handle invalid input for watt', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: '12' } });
    const wattInput = screen.getByLabelText(/watt/i);
    fireEvent.change(wattInput, { target: { value: 'abc' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.queryByText('Amper: 2')).not.toBeInTheDocument();
  });

  test('should handle empty input for voltage', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: '' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.queryByText('Amper: 2')).not.toBeInTheDocument();
  });

  test('should handle empty input for ohms', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: '12' } });
    const ohmsInput = screen.getByLabelText(/ohms/i);
    fireEvent.change(ohmsInput, { target: { value: '' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.queryByText('Amper: 2')).not.toBeInTheDocument();
  });

  test('should handle empty input for watt', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: '12' } });
    const wattInput = screen.getByLabelText(/watt/i);
    fireEvent.change(wattInput, { target: { value: '' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.queryByText('Amper: 2')).not.toBeInTheDocument();
  });

  test('should handle zero input for voltage', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: '0' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.queryByText('Amper: 2')).not.toBeInTheDocument();
  });

  test('should handle zero input for ohms', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: '12' } });
    const ohmsInput = screen.getByLabelText(/ohms/i);
    fireEvent.change(ohmsInput, { target: { value: '0' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.queryByText('Amper: 2')).not.toBeInTheDocument();
  });

  test('should handle zero input for watt', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: '12' } });
    const wattInput = screen.getByLabelText(/watt/i);
    fireEvent.change(wattInput, { target: { value: '0' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.queryByText('Amper: 2')).not.toBeInTheDocument();
  });

  test('should handle decimal input for voltage', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: '12.5' } });
    const ohmsInput = screen.getByLabelText(/ohms/i);
    fireEvent.change(ohmsInput, { target: { value: '6' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByText('Amper: 2.08')).toBeInTheDocument();
  });

  test('should handle decimal input for ohms', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: '12' } });
    const ohmsInput = screen.getByLabelText(/ohms/i);
    fireEvent.change(ohmsInput, { target: { value: '6.5' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByText('Amper: 1.85')).toBeInTheDocument();
  });

  test('should handle decimal input for watt', () => {
    render(<OhmsCalculator />);
    const voltInput = screen.getByLabelText(/voltios/i);
    fireEvent.change(voltInput, { target: { value: '12' } });
    const wattInput = screen.getByLabelText(/watt/i);
    fireEvent.change(wattInput, { target: { value: '24.5' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByText('Ohms: 6.08')).toBeInTheDocument();
  });
});
