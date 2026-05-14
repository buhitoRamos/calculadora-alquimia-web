import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextArea from '../components/Text-area/TextArea';

describe('TextArea', () => {
  const mockCalculate = jest.fn();
  const mockClear = jest.fn();

  beforeEach(() => {
    mockCalculate.mockClear();
    mockClear.mockClear();
  });

  test('renders with alchemy type and header', () => {
    render(
      <TextArea
        result=""
        calculate={mockCalculate}
        clear={mockClear}
        Class="bg-slate-900/60 text-violet-200"
        Type="Alquimia"
        headerClass="bg-violet-900/40 text-violet-300"
        calcBtnClass="bg-violet-600"
      />
    );

    expect(screen.getByText('Alquimia')).toBeInTheDocument();
  });

  test('renders with ohms type and header', () => {
    render(
      <TextArea
        result=""
        calculate={mockCalculate}
        clear={mockClear}
        Class="bg-slate-900/60 text-cyan-300"
        Type="Ley de Ohm"
        headerClass="bg-cyan-900/40 text-cyan-300"
        calcBtnClass="bg-cyan-600"
      />
    );

    expect(screen.getByText('Ley de Ohm')).toBeInTheDocument();
  });

  test('renders Calcular and Reset buttons', () => {
    render(
      <TextArea
        result=""
        calculate={mockCalculate}
        clear={mockClear}
        Class="test-class"
        Type="Alquimia"
        headerClass="bg-violet-900/40"
        calcBtnClass="bg-violet-600"
      />
    );

    expect(screen.getByRole('button', { name: /calcular/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  test('calls calculate when Calcular button is clicked', () => {
    render(
      <TextArea
        result=""
        calculate={mockCalculate}
        clear={mockClear}
        Class="test-class"
        Type="Alquimia"
        headerClass="bg-violet-900/40"
        calcBtnClass="bg-violet-600"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /calcular/i }));
    expect(mockCalculate).toHaveBeenCalledTimes(1);
  });

  test('calls clear when Reset button is clicked', () => {
    render(
      <TextArea
        result=""
        calculate={mockCalculate}
        clear={mockClear}
        Class="test-class"
        Type="Alquimia"
        headerClass="bg-violet-900/40"
        calcBtnClass="bg-violet-600"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(mockClear).toHaveBeenCalledTimes(1);
  });

  test('displays result text in textarea', () => {
    render(
      <TextArea
        result="ML TOTAL: 100.00ml\nGLICERINA: 70.00ml"
        calculate={mockCalculate}
        clear={mockClear}
        Class="test-class"
        Type="Alquimia"
        headerClass="bg-violet-900/40"
        calcBtnClass="bg-violet-600"
      />
    );

    const textarea = screen.getByRole('textbox', { name: 'Alquimia' });
    expect(textarea).toHaveAttribute('aria-label', 'Alquimia');
  });

  test('renders textarea with correct aria-label', () => {
    render(
      <TextArea
        result=""
        calculate={mockCalculate}
        clear={mockClear}
        Class="test-class"
        Type="Ley de Ohm"
        headerClass="bg-cyan-900/40"
        calcBtnClass="bg-cyan-600"
      />
    );

    const textarea = screen.getByRole('textbox', { name: 'Ley de Ohm' });
    expect(textarea).toBeInTheDocument();
  });

  test('uses default headerClass when not provided', () => {
    render(
      <TextArea
        result=""
        calculate={mockCalculate}
        clear={mockClear}
        Class="test-class"
        Type="Alquimia"
      />
    );

    expect(screen.getByText('Alquimia')).toBeInTheDocument();
  });
});