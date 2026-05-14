import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

jest.mock('react-confirm-alert', () => ({
  confirmAlert: jest.fn(),
}));

describe('App', () => {
  test('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('⚗️ Calculadora Alquimia')).toBeInTheDocument();
  });

  test('renders the author credit', () => {
    render(<App />);
    expect(screen.getByText('by Buh!to')).toBeInTheDocument();
  });

  test('shows AlchemyCalculator by default', () => {
    render(<App />);
    expect(screen.getByText('⚗️ Calculadora Alquimia')).toBeInTheDocument();
  });

  test('switches to OhmsCalculator when Ley de Ohm tab is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /ley de ohm/i }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ley de Ohm');
  });

  test('switches back to AlchemyCalculator when Alquimia tab is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /ley de ohm/i }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ley de Ohm');
    fireEvent.click(screen.getByRole('button', { name: /alquimia/i }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Calculadora Alquimia');
  });

  test('renders both tab buttons', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /alquimia/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ley de ohm/i })).toBeInTheDocument();
  });

  test('AlchemyCalculator tab is active by default', () => {
    render(<App />);
    const alchemyTab = screen.getByRole('button', { name: /alquimia/i });
    expect(alchemyTab).toHaveTextContent('⚗️ Alquimia');
  });
});