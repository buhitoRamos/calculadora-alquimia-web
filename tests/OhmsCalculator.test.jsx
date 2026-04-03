import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OhmsCalculator from '../src/components/Ohms-calculator/OhmsCalculator';

describe('OhmsCalculator', () => {
  test('renders the component with default values', () => {
    render(<OhmsCalculator />);
    expect(screen.getByText(/Ingrese solo 2 valores/i)).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText(/ingrese valor/i)[0]).toHaveValue('');
    expect(screen.getAllByPlaceholderText(/ingrese valor/i)[1]).toHaveValue('');
  });

  test('calculates amperage when voltage and resistance are provided', () => {
    render(<OhmsCalculator />);
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[0], { target: { value: '12' } });
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[1], { target: { value: '3' } });
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(screen.getByText(/Amper: 4.00/)).toBeInTheDocument();
  });

  test('calculates resistance when voltage and power are provided', () => {
    render(<OhmsCalculator />);
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[0], { target: { value: '12' } });
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[1], { target: { value: '144' } });
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(screen.getByText(/Ohms: 3.00/)).toBeInTheDocument();
  });

  test('calculates power when current and resistance are provided', () => {
    render(<OhmsCalculator />);
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[2], { target: { value: '3' } });
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[3], { target: { value: '10' } });
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(screen.getByText(/Watt: 30.00/)).toBeInTheDocument();
  });

  test('calculates voltage when current and resistance are provided', () => {
    render(<OhmsCalculator />);
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[1], { target: { value: '144' } });
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[3], { target: { value: '10' } });
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(screen.getByText(/Volt: 14.40/)).toBeInTheDocument();
  });

  test('displays error message when less than 2 values are provided', () => {
    render(<OhmsCalculator />);
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[0], { target: { value: '12' } });
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(screen.getByText(/Se denbe ingresar solo 2 valores para calcular el resto/)).toBeInTheDocument();
  });

  test('clears form and result on clear button click', () => {
    render(<OhmsCalculator />);
    fireEvent.change(screen.getAllByPlaceholderText(/ingrese valor/i)[0], { target: { value: '12' } });
    fireEvent.click(screen.getByText(/Calcular/i));
    expect(screen.getByText(/Amper: 4.00/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Limpiar/i));
    expect(screen.getAllByPlaceholderText(/ingrese valor/i)[0]).toHaveValue('');
    expect(screen.getAllByPlaceholderText(/ingrese valor/i)[1]).toHaveValue('');
    expect(screen.getByText(/Se denbe ingresar solo 2 valores para calcular el resto/)).toBeInTheDocument();
  });
});
