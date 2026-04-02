import React from 'react';
import { render, screen } from '@testing-library/react';
import OhmsCalculator from '../src/components/Ohms-calculator/OhmsCalculator';

describe('OhmsCalculator', () => {
  it('should calculate amperage correctly', () => {
    render(<OhmsCalculator />);
    // Simulate input values
    const voltInput = screen.getByLabelText(/voltios/i);
    const ohmsInput = screen.getByLabelText(/ohms/i);
    userEvent.type(voltInput, '10');
    userEvent.type(ohmsInput, '5');

    // Trigger calculation
    const calculateButton = screen.getByText('Calcular');
    fireEvent.click(calculateButton);

    // Check result
    expect(screen.getByText(/amper: 2\.00/i)).toBeInTheDocument();
  });

  it('should calculate ohms correctly', () => {
    render(<OhmsCalculator />);
    // Simulate input values
    const voltInput = screen.getByLabelText(/voltios/i);
    const wattInput = screen.getByLabelText(/watt/i);
    userEvent.type(voltInput, '10');
    userEvent.type(wattInput, '50');

    // Trigger calculation
    const calculateButton = screen.getByText('Calcular');
    fireEvent.click(calculateButton);

    // Check result
    expect(screen.getByText(/ohms: 2\.00/i)).toBeInTheDocument();
  });

  it('should calculate wattage correctly', () => {
    render(<OhmsCalculator />);
    // Simulate input values
    const ampInput = screen.getByLabelText(/amper/i);
    const ohmsInput = screen.getByLabelText(/ohms/i);
    userEvent.type(ampInput, '2');
    userEvent.type(ohmsInput, '5');

    // Trigger calculation
    const calculateButton = screen.getByText('Calcular');
    fireEvent.click(calculateButton);

    // Check result
    expect(screen.getByText(/watt: 10\.00/i)).toBeInTheDocument();
  });

  it('should calculate voltage correctly', () => {
    render(<OhmsCalculator />);
    // Simulate input values
    const ampInput = screen.getByLabelText(/amper/i);
    const wattInput = screen.getByLabelText(/watt/i);
    userEvent.type(ampInput, '2');
    userEvent.type(wattInput, '50');

    // Trigger calculation
    const calculateButton = screen.getByText('Calcular');
    fireEvent.click(calculateButton);

    // Check result
    expect(screen.getByText(/volt: 25\.00/i)).toBeInTheDocument();
  });

  it('should handle missing input values', () => {
    render(<OhmsCalculator />);
    // Simulate input values
    const voltInput = screen.getByLabelText(/voltios/i);
    userEvent.type(voltInput, '10');

    // Trigger calculation
    const calculateButton = screen.getByText('Calcular');
    fireEvent.click(calculateButton);

    // Check result
    expect(screen.getByText(/debe ingresar un valor en "watt"/i)).toBeInTheDocument();
  });
});
