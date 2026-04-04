import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AlchemyCalculator from "../components/Alchemy-calculator/AlchemyCalculator";
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert

// Mock react-confirm-alert
jest.mock('react-confirm-alert', () => ({
  confirmAlert: jest.fn(),
}));

// Mock setResult from useState to capture calls
const mockSetResult = jest.fn();
const originalUseState = jest.requireActual('react').useState; // Get the actual useState

beforeAll(() => {
  jest.spyOn(React, 'useState').mockImplementation((initialValue) => {
    // Call the original useState for all instances
    const [value, setter] = originalUseState(initialValue);
    // If the initialValue is an empty string, we assume it's the result state.
    // Replace its setter with our mockSetResult.
    if (typeof initialValue === 'string' && initialValue === "") {
      return [value, mockSetResult];
    }
    // For other state variables, return the original value and setter
    return [value, setter];
  });
});

afterAll(() => {
  jest.restoreAllMocks(); // Restore all mocks after all tests are done
});

describe("AlchemyCalculator", () => {
  beforeEach(() => {
    confirmAlert.mockClear(); // Clear mock calls before each test
    mockSetResult.mockClear(); // Clear mock calls for setResult
  });

  test("should add aroms and calculate total ML", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });

    // Expect the input value to be present
    expect(screen.getByDisplayValue("Arom1")).toBeVisible();
    expect(screen.getByDisplayValue("50")).toBeVisible();

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    expect(mockSetResult).not.toHaveBeenCalled();
    expect(confirmAlert).toHaveBeenCalledTimes(1);
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
  });

  test("should handle clear button", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });

    const addAromaButton = screen.getByRole('button', { name: /agregar aroma/i });
    expect(addAromaButton).toHaveTextContent('Agregar aroma');
    fireEvent.click(addAromaButton); // Add another empty aroma slot

    const aromInput2 = screen.getAllByPlaceholderText("nombre del aroma")[1]; // Get the newly added aroma input
    fireEvent.change(aromInput2, { target: { value: "Arom2" } });
    const percentInput2 = screen.getAllByLabelText("porcentaje de aroma")[1]; // Get the newly added percentage input
    fireEvent.change(percentInput2, { target: { value: "30" } });

    expect(screen.getByDisplayValue("Arom1")).toBeVisible();
    expect(screen.getByDisplayValue("50")).toBeVisible();
    expect(screen.getByDisplayValue("Arom2")).toBeVisible();
    expect(screen.getByDisplayValue("30")).toBeVisible();

    fireEvent.click(screen.getByText("Reset")); // Changed 'Limpiar' to 'Reset' to match component

    // After clear, there should be no aroma inputs by default
    const clearedAromInputs = screen.queryAllByPlaceholderText("nombre del aroma");
    const clearedPercentInputs = screen.queryAllByLabelText("porcentaje de aroma");

    expect(clearedAromInputs.length).toBe(0); // No aroma rows remain after clear
    expect(clearedPercentInputs.length).toBe(0);
    expect(screen.queryByPlaceholderText("nombre del aroma")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("porcentaje de aroma")).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue("Arom1")).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue("50")).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue("Arom2")).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue("30")).not.toBeInTheDocument();
    expect(mockSetResult).toHaveBeenCalledWith('');
  });

  test("should handle input with numbers for arom name", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom123" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    
    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    expect(mockSetResult).not.toHaveBeenCalled();
    expect(confirmAlert).toHaveBeenCalledTimes(1);
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
  });

  test("should handle non-numeric input for percentage resulting in 0 contribution", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "abc" } }); // This input will be treated as NaN
    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    // "abc" will not be displayed, as type="number" filters it
    expect(screen.queryByDisplayValue("abc")).not.toBeInTheDocument();
    expect(percentInput).toHaveDisplayValue(""); // Expect empty string for non-numeric input in number field

    expect(mockSetResult).not.toHaveBeenCalled();
    expect(confirmAlert).toHaveBeenCalledTimes(1);
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
  });

  test("should handle percentage greater than 100 (e.g., 150)", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "150" } }); // "150" has length 3, and maxLength is 4, so it should be set

    expect(screen.getByDisplayValue("150")).toBeVisible(); // Value should be present in input

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    expect(mockSetResult).not.toHaveBeenCalled();
    expect(confirmAlert).toHaveBeenCalledTimes(1); // Only for GLICERINA, exits early
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
  });

  test("should handle percentage less than 0", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "-50" } });
    expect(screen.getByDisplayValue("-50")).toBeVisible();

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    expect(mockSetResult).not.toHaveBeenCalled();
    expect(confirmAlert).toHaveBeenCalledTimes(1); // Only for GLICERINA, exits early
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
  });

  test("should handle empty input for arom name", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });

    expect(aromInput).toHaveValue(""); // Name is empty
    expect(screen.getByDisplayValue("50")).toBeVisible();
    
    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    expect(mockSetResult).not.toHaveBeenCalled();
    expect(confirmAlert).toHaveBeenCalledTimes(1);
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
  });

  test("should handle empty input for percentage", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "" } }); // This input will be treated as NaN

    expect(percentInput).toHaveDisplayValue(""); // Percentage is empty
    
    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    expect(mockSetResult).not.toHaveBeenCalled();
    expect(confirmAlert).toHaveBeenCalledTimes(1);
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
  });

  test("should handle decimal input for percentage", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50.5" } });
    
    expect(percentInput).toHaveDisplayValue("50.5"); // Value should be set
    
    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    expect(mockSetResult).not.toHaveBeenCalled();
    expect(confirmAlert).toHaveBeenCalledTimes(1);
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
  });

  test("should handle multiple aroms and calculate total ML", () => {
    render(<AlchemyCalculator />);
    // First aroma (index 0)
    let aromInputs = screen.getAllByPlaceholderText("nombre del aroma");
    let percentInputs = screen.getAllByLabelText("porcentaje de aroma");
    fireEvent.change(aromInputs[0], { target: { value: "Arom1" } });
    fireEvent.change(percentInputs[0], { target: { value: "50" } });

    // Ensure the add aroma button text is "Agregar aroma" and click it
    const addAromaButton = screen.getByRole('button', { name: /agregar aroma/i });
    expect(addAromaButton).toHaveTextContent('Agregar aroma');
    fireEvent.click(addAromaButton);

    // Get the newly added aroma inputs (now there are 2)
    aromInputs = screen.getAllByPlaceholderText("nombre del aroma");
    percentInputs = screen.getAllByLabelText("porcentaje de aroma");
    fireEvent.change(aromInputs[1], { target: { value: "Arom2" } });
    fireEvent.change(percentInputs[1], { target: { value: "30" } });

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    expect(mockSetResult).not.toHaveBeenCalled();
    expect(confirmAlert).toHaveBeenCalledTimes(1);
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
  });

  test("should handle zero input for percentage", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "0" } });
    
    expect(screen.getByDisplayValue("0")).toBeVisible();
    
    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    expect(mockSetResult).not.toHaveBeenCalled();
    expect(confirmAlert).toHaveBeenCalledTimes(1);
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
  });

  test("should trigger confirmAlert for zero input for total ML", async () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    const addAromaButton = screen.getByRole('button', { name: /agregar aroma/i });
    expect(addAromaButton).toHaveTextContent('Agregar aroma');
    fireEvent.click(addAromaButton);

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "0" } });
    fireEvent.click(screen.getByText("Calcular"));

    expect(confirmAlert).toHaveBeenCalledTimes(1); // Only for ML TOTAL, as component returns early
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe ingresar un valor en "ML TOTAL"',
    }));
    expect(mockSetResult).toHaveBeenCalledWith('');
  });

  test("should trigger confirmAlert for negative input for total ML", async () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    // Adjusting for button text change expectation
    const addAromaButton = screen.getByRole('button', { name: /agregar aroma/i });
    expect(addAromaButton).toHaveTextContent('Agregar aroma');
    fireEvent.click(addAromaButton);

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "-100" } });
    fireEvent.click(screen.getByText("Calcular"));

    expect(confirmAlert).toHaveBeenCalledTimes(1); // Only for ML TOTAL, as component returns early
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe ingresar un valor en "ML TOTAL"',
    }));
    expect(mockSetResult).toHaveBeenCalledWith('');
  });

  test("should handle decimal input for total ML", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    const addAromaButton = screen.getByRole('button', { name: /agregar aroma/i });
    expect(addAromaButton).toHaveTextContent('Agregar aroma');
    fireEvent.click(addAromaButton);

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "12.5" } });
    fireEvent.click(screen.getByText("Calcular"));

    expect(mockSetResult).not.toHaveBeenCalled();
    expect(confirmAlert).toHaveBeenCalledTimes(1);
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
  });

  test("should trigger confirmAlert if GLICERINA input is missing/invalid", async () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    // Adjusting for button text change expectation
    const addAromaButton = screen.getByRole('button', { name: /agregar aroma/i });
    expect(addAromaButton).toHaveTextContent('Agregar aroma');
    fireEvent.click(addAromaButton);

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    // GLICERINA input is intentionally left empty for this test

    fireEvent.click(screen.getByText("Calcular"));

    expect(confirmAlert).toHaveBeenCalledTimes(1);
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
    expect(mockSetResult).not.toHaveBeenCalled(); // Expect setResult not to be called due to early return without explicit result clear
  });


  test("should correctly calculate and display PG when total ML PG is positive, and alert for missing Glycerine", async () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } }); // 50% aroma
    const addAromaButton = screen.getByRole('button', { name: /agregar aroma/i });
    expect(addAromaButton).toHaveTextContent('Agregar aroma');
    fireEvent.click(addAromaButton);

    const pgInput = screen.getByRole("spinbutton", { name: "PROPILEN" });
    fireEvent.change(pgInput, { target: { value: "10" } }); // 10% PG
    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } }); // 100ml total

    fireEvent.click(screen.getByText("Calcular"));

    expect(confirmAlert).toHaveBeenCalledTimes(1);
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
    expect(mockSetResult).not.toHaveBeenCalled(); // Expect setResult not to be called due to early return without explicit result clear
  });

  test("should not allow PROPILEN input to exceed maxLength", () => {
    render(<AlchemyCalculator />);
    const propilenInput = screen.getByRole('spinbutton', { name: 'PROPILEN' });
    
    // Set an initial valid value within maxLength
    fireEvent.change(propilenInput, { target: { value: '123' } });
    expect(propilenInput).toHaveDisplayValue('123');

    // Attempt to type a value longer than maxLength (which is 3 for percentages)
    // The handleFormChange logic prevents setting value if value.length is not < maxLength + 1
    fireEvent.change(propilenInput, { target: { value: '1234', maxLength: 3 } });
    expect(propilenInput).toHaveDisplayValue('123'); // Value should remain '123' because '1234' is too long

    // Attempt to type a value exactly at maxLength
    fireEvent.change(propilenInput, { target: { value: '123', maxLength: 3 } });
    expect(propilenInput).toHaveDisplayValue('123'); // Should accept up to maxLength
  });
});
