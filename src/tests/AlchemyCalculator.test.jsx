import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlchemyCalculator from '../components/Alchemy-calculator/AlchemyCalculator';

describe('AlchemyCalculator', () => {
  test('should add aroms and calculate total ML', () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByLabelText(/nombre del aroma/i);
    fireEvent.change(aromInput, { target: { value: 'Arom1' } });
    const percentInput = screen.getByLabelText(/%/i);
    fireEvent.change(percentInput, { target: { value: '50' } });
    fireEvent.click(screen.getByText('Agregar'));
    expect(screen.getByText('Arom1')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();

    const totalMLInput = screen.getByLabelText(/ml total/i);
    fireEvent.change(totalMLInput, { target: { value: '100' } });
    fireEvent.click(screen.getByText('Calcular'));
    expect(screen.getByText('Total ML Arom: 50')).toBeInTheDocument();
  });

  test('should handle clear button', () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByLabelText(/nombre del aroma/i);
    fireEvent.change(aromInput, { target: { value: 'Arom1' } });
    const percentInput = screen.getByLabelText(/%/i);
    fireEvent.change(percentInput, { target: { value: '50' } });
    fireEvent.click(screen.getByText('Agregar'));
    expect(screen.getByText('Arom1')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Limpiar'));
    expect(aromInput.value).toBe('');
    expect(percentInput.value).toBe('');
    expect(screen.queryByText('Arom1')).not.toBeInTheDocument();
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });
});
