import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AlchemyCalculator from '../src/components/Alchemy-calculator/AlchemyCalculator';

describe('AlchemyCalculator', () => {
  it('renders the component with default state', () => {
    render(<AlchemyCalculator />);
    expect(screen.getByText(/ML TOTAL/i)).toBeInTheDocument();
    expect(screen.getByText(/GLICERINA/i)).toBeInTheDocument();
    expect(screen.getByText(/PROPILEN/i)).toBeInTheDocument();
    expect(screen.getByText(/NICOTINA/i)).toBeInTheDocument();
  });

  it('adds and deletes aroms', () => {
    render(<AlchemyCalculator />);
    fireEvent.click(screen.getByText(/add/i));
    expect(screen.getAllByRole('textbox')).toHaveLength(5);
    fireEvent.click(screen.getByText(/delete/i));
    expect(screen.getAllByRole('textbox')).toHaveLength(4);
  });

  it('updates form values', () => {
    render(<AlchemyCalculator />);
    fireEvent.change(screen.getByLabelText(/ml total/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/glicerina/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/propien/i), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText(/nicotina/i), { target: { value: '2' } });
  });

  it('calculates result', () => {
    render(<AlchemyCalculator />);
    fireEvent.change(screen.getByLabelText(/ml total/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/glicerina/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/propien/i), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText(/nicotina/i), { target: { value: '2' } });
    fireEvent.click(screen.getByText(/calculate/i));
    expect(screen.getByText(/ml total: 100ml/)).toBeInTheDocument();
    expect(screen.getByText(/glicerina: 5ml/)).toBeInTheDocument();
    expect(screen.getByText(/propien: 3ml/)).toBeInTheDocument();
    expect(screen.getByText(/nicotina: 2ml/)).toBeInTheDocument();
  });

  it('clears the form', () => {
    render(<AlchemyCalculator />);
    fireEvent.change(screen.getByLabelText(/ml total/i), { target: { value: '100' } });
    fireEvent.click(screen.getByText(/calculate/i));
    expect(screen.getByText(/ml total: 100ml/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/clear/i));
    expect(screen.queryByText(/ml total: 100ml/)).not.toBeInTheDocument();
  });

  it('auto completes values', () => {
    render(<AlchemyCalculator />);
    fireEvent.change(screen.getByLabelText(/glicerina/i), { target: { value: '5' } });
    expect(screen.getByText(/propien: 95/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/propien/i), { target: { value: '3' } });
    expect(screen.getByText(/nicotina: 97/)).toBeInTheDocument();
  });

  it('handles invalid input', () => {
    render(<AlchemyCalculator />);
    fireEvent.change(screen.getByLabelText(/ml total/i), { target: { value: '' } });
    fireEvent.click(screen.getByText(/calculate/i));
    expect(screen.getByText(/debe ingresar un valor en "ml total"/i)).toBeInTheDocument();
  });

  it('handles negative values', () => {
    render(<AlchemyCalculator />);
    fireEvent.change(screen.getByLabelText(/glicerina/i), { target: { value: '-5' } });
    fireEvent.click(screen.getByText(/calculate/i));
    expect(screen.getByText(/debe utilizar un porcentaje de glicerina/i)).toBeInTheDocument();
  });

  it('handles zero values', () => {
    render(<AlchemyCalculator />);
    fireEvent.change(screen.getByLabelText(/glicerina/i), { target: { value: '0' } });
    fireEvent.click(screen.getByText(/calculate/i));
    expect(screen.getByText(/debe utilizar un porcentaje de glicerina/i)).toBeInTheDocument();
  });

  it('handles invalid arom values', () => {
    render(<AlchemyCalculator />);
    fireEvent.change(screen.getByLabelText(/nicotina/i), { target: { value: '105' } });
    fireEvent.click(screen.getByText(/calculate/i));
    expect(screen.getByText(/debe utilizar mas % de propilengligol o menos cantidad de aroma\/nicotina/i)).toBeInTheDocument();
  });

  it('handles zero arom values', () => {
    render(<AlchemyCalculator />);
    fireEvent.change(screen.getByLabelText(/nicotina/i), { target: { value: '0' } });
    fireEvent.click(screen.getByText(/calculate/i));
    expect(screen.getByText(/debe utilizar mas % de propilengligol o menos cantidad de aroma\/nicotina/i)).toBeInTheDocument();
  });
});
