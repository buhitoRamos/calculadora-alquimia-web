import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AlchemyCalculator from './AlchemyCalculator.jsx';
import Aroms from '../Aroms/Aroms';
import TextArea from '../Text-area/TextArea';
import { confirmAlert } from 'react-confirm-alert';

// Mock dependencies
jest.mock('react-confirm-alert', () => ({
  confirmAlert: jest.fn(),
}));

jest.mock('../Aroms/Aroms', () => () => <div data-testid="aroms-mock" />);
jest.mock('../Text-area/TextArea', () => () => <div data-testid="textarea-mock" />);

describe('AlchemyCalculator Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test _sumAroms function
  describe('_sumAroms', () => {
    test('should return correct total when all aroms have values', () => {
      const form = [
        { name: "ML TOTAL", value: "100" },
        { name: "GLICERINA", value: "20" },
        { name: "PROPILEN", value: "30" },
        { name: "NICOTINA", value: "40" },
      ];
      const aroms = [
        { name: "Aroma 1", index: 0, value: "10" },
        { name: "Aroma 2", index: 1, value: "20" },
      ];
      const result = AlchemyCalculator._sumAroms(100);
      expect(result).toBe(30);
    });

    test('should return 0 when totalML is 0', () => {
      const result = AlchemyCalculator._sumAroms(0);
      expect(result).toBe(0);
    });

    test('should return 0 when form[3].value is empty', () => {
      const form = [
        { name: "ML TOTAL", value: "100" },
        { name: "GLICERINA", value: "20" },
        { name: "PROPILEN", value: "30" },
        { name: "NICOTINA", value: "" },
      ];
      const aroms = [
        { name: "Aroma 1", index: 0, value: "10" },
        { name: "Aroma 2", index: 1, value: "20" },
      ];
      const result = AlchemyCalculator._sumAroms(100);
      expect(result).toBe(0);
    });

    test('should return 0 when aroms are empty', () => {
      const form = [
        { name: "ML TOTAL", value: "100" },
        { name: "GLICERINA", value: "20" },
        { name: "PROPILEN", value: "30" },
        { name: "NICOTINA", value: "40" },
      ];
      const aroms = [];
      const result = AlchemyCalculator._sumAroms(100);
      expect(result).toBe(0);
    });

    test('should return 0 when aroms have non-numeric values', () => {
      const form = [
        { name: "ML TOTAL", value: "100" },
        { name: "GLICERINA", value: "20" },
        { name: "PROPILEN", value: "30" },
        { name: "NICOTINA", value: "40" },
      ];
      const aroms = [
        { name: "Aroma 1", index: 0, value: "abc" },
        { name: "Aroma 2", index: 1, value: "def" },
      ];
      const result = AlchemyCalculator._sumAroms(100);
      expect(result).toBe(0);
    });
  });

  // Test calculate function
  describe('calculate', () => {
    test('should calculate result correctly', () => {
      const form = [
        { name: "ML TOTAL", value: "100" },
        { name: "GLICERINA", value: "20" },
        { name: "PROPILEN", value: "30" },
        { name: "NICOTINA", value: "40" },
      ];
      const aroms = [
        { name: "Aroma 1", index: 0, value: "10" },
        { name: "Aroma 2", index: 1, value: "20" },
      ];
      const result = AlchemyCalculator.calculate(form, aroms);
      expect(result).toContain('ML TOTAL: 100ml');
      expect(result).toContain('GLICERINA: 20ml');
      expect(result).toContain('PROPILEN: 30ml');
      expect(result).toContain('NICOTINA: 40ml');
      expect(result).toContain('Aroma 1: 10ml');
      expect(result).toContain('Aroma 2: 20ml');
    });

    test('should trigger alert when ML TOTAL is empty', () => {
      const form = [
        { name: "ML TOTAL", value: "" },
        { name: "GLICERINA", value: "20" },
        { name: "PROPILEN", value: "30" },
        { name: "NICOTINA", value: "40" },
      ];
      const aroms = [
        { name: "Aroma 1", index: 0, value: "10" },
        { name: "Aroma 2", index: 1, value: "20" },
      ];
      const spy = jest.spyOn(AlchemyCalculator, '_confirmAlert');
      AlchemyCalculator.calculate(form, aroms);
      expect(spy).toHaveBeenCalledWith('Debe ingresar un valor en "ML TOTAL"');
    });

    test('should trigger alert when Glicerina is empty', () => {
      const form = [
        { name: "ML TOTAL", value: "100" },
        { name: "GLICERINA", value: "" },
        { name: "PROPILEN", value: "30" },
        { name: "NICOTINA", value: "40" },
      ];
      const aroms = [
        { name: "Aroma 1", index: 0, value: "10" },
        { name: "Aroma 2", index: 1, value: "20" },
      ];
      const spy = jest.spyOn(AlchemyCalculator, '_confirmAlert');
      AlchemyCalculator.calculate(form, aroms);
      expect(spy).toHaveBeenCalledWith('Debe utilizar un porcentaje de glicerina');
    });

    test('should trigger alert when totalMlPg is negative', () => {
      const form = [
        { name: "ML TOTAL", value: "100" },
        { name: "GLICERINA", value: "20" },
        { name: "PROPILEN", value: "30" },
        { name: "NICOTINA", value: "40" },
      ];
      const aroms = [
        { name: "Aroma 1", index: 0, value: "100" },
        { name: "Aroma 2", index: 1, value: "200" },
      ];
      const spy = jest.spyOn(AlchemyCalculator, '_confirmAlert');
      AlchemyCalculator.calculate(form, aroms);
      expect(spy).toHaveBeenCalledWith('Debe utilizar mas % de Propilengligol o menos cantidad de aroma/nicotina');
    });

    test('should return empty string when all values are empty', () => {
      const form = [
        { name: "ML TOTAL", value: "" },
        { name: "GLICERINA", value: "" },
        { name: "PROPILEN", value: "" },
        { name: "NICOTINA", value: "" },
      ];
      const aroms = [];
      const result = AlchemyCalculator.calculate(form, aroms);
      expect(result).toBe('');
    });

    test('should return empty string when aroms are empty', () => {
      const form = [
        { name: "ML TOTAL", value: "100" },
        { name: "GLICERINA", value: "20" },
        { name: "PROPILEN", value: "30" },
        { name: "NICOTINA", value: "40" },
      ];
      const aroms = [];
      const result = AlchemyCalculator.calculate(form, aroms);
      expect(result).toBe('');
    });
  });

  // Test clear function
  describe('clear', () => {
    test('should reset form and aroms to initial state', () => {
      const component = render(
        <MemoryRouter>
          <AlchemyCalculator />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByText('Reset'));

      expect(screen.getByTestId('textarea-mock')).toHaveValue('');
      expect(screen.getByTestId('aroms-mock')).toBeInTheDocument();
    });

    test('should reset form and aroms after multiple clears', () => {
      const component = render(
        <MemoryRouter>
          <AlchemyCalculator />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByText('Reset'));
      fireEvent.click(screen.getByText('Reset'));

      expect(screen.getByTestId('textarea-mock')).toHaveValue('');
      expect(screen.getByTestId('aroms-mock')).toBeInTheDocument();
    });

    test('should reset form and aroms when called directly', () => {
      const instance = new AlchemyCalculator();
      instance.clear();
      expect(instance.form).toEqual([
        { name: "ML TOTAL", value: "" },
        { name: "GLICERINA", value: "" },
        { name: "PROPILEN", value: "" },
        { name: "NICOTINA", value: "" }
      ]);
      expect(instance.aroms).toEqual([{ name: "", index: 0, value: "" }]);
    });
  });

  // Test _autoComplete function
  describe('_autoComplete', () => {
    test('should return empty string when val is empty', () => {
      const result = AlchemyCalculator._autoComplete('GLICERINA', '');
      expect(result).toEqual({ id: 'GLICERINA', value: '' });
    });

    test('should return 100 - val when val is a number', () => {
      const result = AlchemyCalculator._autoComplete('GLICERINA', '50');
      expect(result).toEqual({ id: 'GLICERINA', value: '50' });
    });

    test('should return 100 - val when val is a string that can be parsed as a number', () => {
      const result = AlchemyCalculator._autoComplete('GLICERINA', '75');
      expect(result).toEqual({ id: 'GLICERINA', value: '75' });
    });

    test('should return empty string when val is a non-numeric string', () => {
      const result = AlchemyCalculator._autoComplete('GLICERINA', 'abc');
      expect(result).toEqual({ id: 'GLICERINA', value: '' });
    });

    test('should return empty string when val is a string with non-numeric characters', () => {
      const result = AlchemyCalculator._autoComplete('GLICERINA', '123abc');
      expect(result).toEqual({ id: 'GLICERINA', value: '' });
    });
  });

  // Test rendering
  describe('Rendering', () => {
    test('should render initial state', () => {
      render(
        <MemoryRouter>
          <AlchemyCalculator />
        </MemoryRouter>
      );

      expect(screen.getByTestId('aroms-mock')).toBeInTheDocument();
      expect(screen.getByTestId('textarea-mock')).toBeInTheDocument();
    });

    test('should render after adding an aroma', () => {
      render(
        <MemoryRouter>
          <AlchemyCalculator />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByText('Add Aroma'));

      expect(screen.getByTestId('aroms-mock')).toBeInTheDocument();
      expect(screen.getByTestId('textarea-mock')).toBeInTheDocument();
    });

    test('should render after deleting an aroma', () => {
      render(
        <MemoryRouter>
          <AlchemyCalculator />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByText('Add Aroma'));
      fireEvent.click(screen.getByText('Delete Aroma'));

      expect(screen.getByTestId('aroms-mock')).toBeInTheDocument();
      expect(screen.getByTestId('textarea-mock')).toBeInTheDocument();
    });

    test('should display result after calculation', () => {
      render(
        <MemoryRouter>
          <AlchemyCalculator />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByLabelText('ML TOTAL'), { target: { value: '100' } });
      fireEvent.change(screen.getByLabelText('GLICERINA'), { target: { value: '20' } });
      fireEvent.change(screen.getByLabelText('PROPILEN'), { target: { value: '30' } });
      fireEvent.change(screen.getByLabelText('NICOTINA'), { target: { value: '40' } });

      fireEvent.click(screen.getByText('Calculate'));

      expect(screen.getByTestId('textarea-mock')).toHaveValue('ML TOTAL: 100ml\nGLICERINA: 20ml\nPROPILEN: 30ml\nNICOTINA: 40ml\nAroma 1: 10ml\nAroma 2: 20ml');
    });

    test('should display result after calculation with multiple aromas', () => {
      render(
        <MemoryRouter>
          <AlchemyCalculator />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByText('Add Aroma'));
      fireEvent.click(screen.getByText('Add Aroma'));

      fireEvent.change(screen.getByLabelText('ML TOTAL'), { target: { value: '200' } });
      fireEvent.change(screen.getByLabelText('GLICERINA'), { target: { value: '30' } });
      fireEvent.change(screen.getByLabelText('PROPILEN'), { target: { value: '40' } });
      fireEvent.change(screen.getByLabelText('NICOTINA'), { target: { value: '50' } });

      fireEvent.change(screen.getByLabelText('Aroma 1'), { target: { value: '10' } });
      fireEvent.change(screen.getByLabelText('Aroma 2'), { target: { value: '20' } });

      fireEvent.click(screen.getByText('Calculate'));

      expect(screen.getByTestId('textarea-mock')).toHaveValue('ML TOTAL: 200ml\nGLICERINA: 30ml\nPROPILEN: 40ml\nNICOTINA: 50ml\nAroma 1: 10ml\nAroma 2: 20ml');
    });

    test('should show confirm alert when ML TOTAL is empty', () => {
      render(
        <MemoryRouter>
          <AlchemyCalculator />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByLabelText('GLICERINA'), { target: { value: '20' } });
      fireEvent.change(screen.getByLabelText('PROPILEN'), { target: { value: '30' } });
      fireEvent.change(screen.getByLabelText('NICOTINA'), { target: { value: '40' } });

      fireEvent.click(screen.getByText('Calculate'));

      expect(confirmAlert).toHaveBeenCalledWith({
        title: 'La operación no se puede realizar con exito, pulse reset para volver a comenzar o cancelar para no perder lo guardado y corregir el error.',
        message: 'Debe ingresar un valor en "ML TOTAL"',
        buttons: [
          {
            label: 'Reset',
            onClick: expect.any(Function),
          },
          {
            label: 'Cancelar',
          }
        ]
      });
    });

    test('should show confirm alert when Glicerina is empty', () => {
      render(
        <MemoryRouter>
          <AlchemyCalculator />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByLabelText('ML TOTAL'), { target: { value: '100' } });
      fireEvent.change(screen.getByLabelText('PROPILEN'), { target: { value: '30' } });
      fireEvent.change(screen.getByLabelText('NICOTINA'), { target: { value: '40' } });

      fireEvent.click(screen.getByText('Calculate'));

      expect(confirmAlert).toHaveBeenCalledWith({
        title: 'La operación no se puede realizar con exito, pulse reset para volver a comenzar o cancelar para no perder lo guardado y corregir el error.',
        message: 'Debe utilizar un porcentaje de glicerina',
        buttons: [
          {
            label: 'Reset',
            onClick: expect.any(Function),
          },
          {
            label: 'Cancelar',
          }
        ]
      });
    });

    test('should show confirm alert when totalMlPg is negative', () => {
      render(
        <MemoryRouter>
          <AlchemyCalculator />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByLabelText('ML TOTAL'), { target: { value: '100' } });
      fireEvent.change(screen.getByLabelText('GLICERINA'), { target: { value: '20' } });
      fireEvent.change(screen.getByLabelText('PROPILEN'), { target: { value: '30' } });
      fireEvent.change(screen.getByLabelText('NICOTINA'), { target: { value: '40' } });

      fireEvent.change(screen.getByLabelText('Aroma 1'), { target: { value: '100' } });
      fireEvent.change(screen.getByLabelText('Aroma 2'), { target: { value: '200' } });

      fireEvent.click(screen.getByText('Calculate'));

      expect(confirmAlert).toHaveBeenCalledWith({
        title: 'La operación no se puede realizar con exito, pulse reset para volver a comenzar o cancelar para no perder lo guardado y corregir el error.',
        message: 'Debe utilizar mas % de Propilengligol o menos cantidad de aroma/nicotina',
        buttons: [
          {
            label: 'Reset',
            onClick: expect.any(Function),
          },
          {
            label: 'Cancelar',
          }
        ]
      });
    });
  });
});
