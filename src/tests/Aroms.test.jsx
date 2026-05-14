import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Aroms from '../components/Aroms/Aroms';

const defaultAroms = [{ name: '', index: 0, value: '' }];
const defaultForm = [
  { name: 'ML TOTAL', value: '' },
  { name: 'GLICERINA', value: '' },
  { name: 'PROPILEN', value: '' },
  { name: 'NICOTINA', value: '' },
];

describe('Aroms', () => {
  const mockHandleChange = jest.fn();
  const mockHandleFormChange = jest.fn();
  const mockAddAroms = jest.fn();
  const mockDeleteAroms = jest.fn();

  beforeEach(() => {
    mockHandleChange.mockClear();
    mockHandleFormChange.mockClear();
    mockAddAroms.mockClear();
    mockDeleteAroms.mockClear();
  });

  test('renders with default aromas and form inputs', () => {
    render(
      <Aroms
        aroms={defaultAroms}
        form={defaultForm}
        handleChange={mockHandleChange}
        handleFormChange={mockHandleFormChange}
        addAroms={mockAddAroms}
        deleteAroms={mockDeleteAroms}
      />
    );

    expect(screen.getByPlaceholderText('nombre del aroma')).toBeInTheDocument();
    expect(screen.getByLabelText('porcentaje de aroma')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'ML TOTAL' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'GLICERINA' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'PROPILEN' })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: 'NICOTINA' })).toBeInTheDocument();
  });

  test('renders add and delete buttons', () => {
    render(
      <Aroms
        aroms={defaultAroms}
        form={defaultForm}
        handleChange={mockHandleChange}
        handleFormChange={mockHandleFormChange}
        addAroms={mockAddAroms}
        deleteAroms={mockDeleteAroms}
      />
    );

    expect(screen.getByRole('button', { name: /agregar aroma/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /eliminar/i })).toBeInTheDocument();
  });

  test('calls addAroms when add button is clicked', () => {
    render(
      <Aroms
        aroms={defaultAroms}
        form={defaultForm}
        handleChange={mockHandleChange}
        handleFormChange={mockHandleFormChange}
        addAroms={mockAddAroms}
        deleteAroms={mockDeleteAroms}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /agregar aroma/i }));
    expect(mockAddAroms).toHaveBeenCalledTimes(1);
  });

  test('calls deleteAroms when delete button is clicked', () => {
    render(
      <Aroms
        aroms={defaultAroms}
        form={defaultForm}
        handleChange={mockHandleChange}
        handleFormChange={mockHandleFormChange}
        addAroms={mockAddAroms}
        deleteAroms={mockDeleteAroms}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /eliminar/i }));
    expect(mockDeleteAroms).toHaveBeenCalledTimes(1);
  });

  test('renders multiple aromas when provided', () => {
    const multipleAroms = [
      { name: 'Arom1', index: 0, value: '50' },
      { name: 'Arom2', index: 1, value: '30' },
    ];

    render(
      <Aroms
        aroms={multipleAroms}
        form={defaultForm}
        handleChange={mockHandleChange}
        handleFormChange={mockHandleFormChange}
        addAroms={mockAddAroms}
        deleteAroms={mockDeleteAroms}
      />
    );

    const aromaInputs = screen.getAllByPlaceholderText('nombre del aroma');
    expect(aromaInputs.length).toBe(2);

    const percentInputs = screen.getAllByLabelText('porcentaje de aroma');
    expect(percentInputs.length).toBe(2);
  });

  test('calls handleChange when aroma name is changed', () => {
    render(
      <Aroms
        aroms={defaultAroms}
        form={defaultForm}
        handleChange={mockHandleChange}
        handleFormChange={mockHandleFormChange}
        addAroms={mockAddAroms}
        deleteAroms={mockDeleteAroms}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('nombre del aroma'), { target: { value: 'Mango' } });
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  test('calls handleChange when aroma percentage is changed', () => {
    render(
      <Aroms
        aroms={defaultAroms}
        form={defaultForm}
        handleChange={mockHandleChange}
        handleFormChange={mockHandleFormChange}
        addAroms={mockAddAroms}
        deleteAroms={mockDeleteAroms}
      />
    );

    fireEvent.change(screen.getByLabelText('porcentaje de aroma'), { target: { value: '20' } });
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  test('calls handleFormChange when form input is changed', () => {
    render(
      <Aroms
        aroms={defaultAroms}
        form={defaultForm}
        handleChange={mockHandleChange}
        handleFormChange={mockHandleFormChange}
        addAroms={mockAddAroms}
        deleteAroms={mockDeleteAroms}
      />
    );

    fireEvent.change(screen.getByRole('spinbutton', { name: 'ML TOTAL' }), { target: { value: '100' } });
    expect(mockHandleFormChange).toHaveBeenCalledTimes(1);
  });

  test('shows empty message when no aromas are present', () => {
    render(
      <Aroms
        aroms={[]}
        form={defaultForm}
        handleChange={mockHandleChange}
        handleFormChange={mockHandleFormChange}
        addAroms={mockAddAroms}
        deleteAroms={mockDeleteAroms}
      />
    );

    expect(screen.getByText('No hay aromas añadidos')).toBeInTheDocument();
  });

  test('does not show empty message when aromas are present', () => {
    render(
      <Aroms
        aroms={defaultAroms}
        form={defaultForm}
        handleChange={mockHandleChange}
        handleFormChange={mockHandleFormChange}
        addAroms={mockAddAroms}
        deleteAroms={mockDeleteAroms}
      />
    );

    expect(screen.queryByText('No hay aromas añadidos')).not.toBeInTheDocument();
  });
});