import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlchemyInput from '../components/Alchemy-input/AlchemyInput';

const defaultForm = [
  { name: 'ML TOTAL', value: '' },
  { name: 'GLICERINA', value: '' },
  { name: 'PROPILEN', value: '' },
  { name: 'NICOTINA', value: '' },
];

describe('AlchemyInput', () => {
  const mockHandleFormChange = jest.fn();

  beforeEach(() => {
    mockHandleFormChange.mockClear();
  });

  test('renders all four form inputs with correct labels', () => {
    render(
      <AlchemyInput
        form={defaultForm}
        handleFormChange={mockHandleFormChange}
        text="Ingreso de datos"
        placeHolder1="ml"
        placeHolder2="%"
        maxLength1="10"
        maxLength2="3"
      />
    );

    expect(screen.getByRole('spinbutton', { name: 'ML TOTAL' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'GLICERINA' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'PROPILEN' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'NICOTINA' })).toBeInTheDocument();
  });

  test('renders the header text', () => {
    render(
      <AlchemyInput
        form={defaultForm}
        handleFormChange={mockHandleFormChange}
        text="Ingreso de aromas y porcentajes"
        placeHolder1="ml"
        placeHolder2="%"
        maxLength1="10"
        maxLength2="3"
      />
    );

    expect(screen.getByText('Ingreso de aromas y porcentajes')).toBeInTheDocument();
  });

  test('calls handleFormChange when any input is changed', () => {
    render(
      <AlchemyInput
        form={defaultForm}
        handleFormChange={mockHandleFormChange}
        text="Ingreso de datos"
        placeHolder1="ml"
        placeHolder2="%"
        maxLength1="10"
        maxLength2="3"
      />
    );

    fireEvent.change(screen.getByRole('spinbutton', { name: 'ML TOTAL' }), { target: { value: '100' } });
    expect(mockHandleFormChange).toHaveBeenCalledTimes(1);
  });

  test('displays form values correctly', () => {
    const filledForm = [
      { name: 'ML TOTAL', value: '100' },
      { name: 'GLICERINA', value: '70' },
      { name: 'PROPILEN', value: '25' },
      { name: 'NICOTINA', value: '5' },
    ];

    render(
      <AlchemyInput
        form={filledForm}
        handleFormChange={mockHandleFormChange}
        text="Ingreso de datos"
        placeHolder1="ml"
        placeHolder2="%"
        maxLength1="10"
        maxLength2="3"
      />
    );

    expect(screen.getByRole('spinbutton', { name: 'ML TOTAL' }).value).toBe('100');
    expect(screen.getByRole('spinbutton', { name: 'GLICERINA' }).value).toBe('70');
    expect(screen.getByRole('spinbutton', { name: 'PROPILEN' }).value).toBe('25');
    expect(screen.getByRole('spinbutton', { name: 'NICOTINA' }).value).toBe('5');
  });

  test('renders with Ohms form labels', () => {
    const ohmsForm = [
      { name: 'VOLTIOS', value: '' },
      { name: 'WATT', value: '' },
      { name: 'OHMS', value: '' },
      { name: 'AMPER', value: '' },
    ];

    render(
      <AlchemyInput
        form={ohmsForm}
        handleFormChange={mockHandleFormChange}
        text="Ingrese solo 2 valores"
        placeHolder1="ingrese valor"
        placeHolder2="ingrese valor"
        maxLength1="4"
        maxLength2="4"
      />
    );

    expect(screen.getByRole('spinbutton', { name: 'VOLTIOS' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'WATT' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'OHMS' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'AMPER' })).toBeInTheDocument();
  });
});