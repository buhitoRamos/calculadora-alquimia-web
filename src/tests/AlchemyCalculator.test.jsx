import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AlchemyCalculator from "../components/Alchemy-calculator/AlchemyCalculator";
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert

// Mock react-confirm-alert
jest.mock('react-confirm-alert', () => ({
  confirmAlert: jest.fn(),
}));

describe("AlchemyCalculator", () => {
  beforeEach(() => {
    confirmAlert.mockClear(); // Clear mock calls before each test
  });

  test("should add aroms and calculate total ML", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });

    // Expect the input value to be present
    expect(screen.getByDisplayValue("Arom1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("50")).toBeInTheDocument();

    const totalMLInput = screen.getByPlaceholderText('ml');
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    const expectedText = `ML TOTAL: 100ml 
 GLICERINA: 0ml 
 PROPILEN: -50.00ml 
 NICOTINA: 0ml 
 Arom1: 50.00ml
`;
    expect(screen.getByRole('textbox', { name: 'Alquimia' })).toHaveValue(expectedText);
    expect(confirmAlert).toHaveBeenCalledTimes(2); // One for GLICERINA, one for negative PG
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar mas % de Propilengligol o menos cantidad de aroma/nicotina',
    }));
  });

  test("should handle clear button", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });

    fireEvent.click(screen.getByText("+ Agregar aroma")); // Add another empty aroma slot

    const aromInput2 = screen.getAllByPlaceholderText("nombre del aroma")[1]; // Get the newly added aroma input
    fireEvent.change(aromInput2, { target: { value: "Arom2" } });
    const percentInput2 = screen.getAllByLabelText("porcentaje de aroma")[1]; // Get the newly added percentage input
    fireEvent.change(percentInput2, { target: { value: "30" } });

    expect(screen.getByDisplayValue("Arom1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("50")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Arom2")).toBeInTheDocument();
    expect(screen.getByDisplayValue("30")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Limpiar"));

    // After clear, there should be one empty aroma input left by default
    const clearedAromInputs = screen.getAllByPlaceholderText("nombre del aroma");
    const clearedPercentInputs = screen.getAllByLabelText("porcentaje de aroma");

    expect(clearedAromInputs.length).toBe(0); // No aroma rows remain after clear
    expect(clearedPercentInputs.length).toBe(0);
    expect(screen.queryByPlaceholderText("nombre del aroma")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("porcentaje de aroma")).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue("Arom1")).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue("50")).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue("Arom2")).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue("30")).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Alquimia' }).value).toBe(''); // Result area cleared
  });

  test("should handle input with numbers for arom name", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom123" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    
    const totalMLInput = screen.getByPlaceholderText('ml');
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    const expectedText = `ML TOTAL: 100ml 
 GLICERINA: 0ml 
 PROPILEN: -50.00ml 
 NICOTINA: 0ml 
 Arom123: 50.00ml
`;
    expect(screen.getByRole('textbox', { name: 'Alquimia' })).toHaveValue(expectedText);
    expect(confirmAlert).toHaveBeenCalledTimes(2); // One for GLICERINA, one for negative PG
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar mas % de Propilengligol o menos cantidad de aroma/nicotina',
    }));
  });

  test("should handle non-numeric input for percentage resulting in 0 contribution", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "abc" } }); // This input will be treated as NaN
    const totalMLInput = screen.getByPlaceholderText('ml');
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    // "abc" will be saved in the state, but parseFloat(aroma.value) will be NaN
    expect(screen.getByDisplayValue("abc")).toBeInTheDocument();
    
    const expectedText = `ML TOTAL: 100ml 
 GLICERINA: 0ml 
 PROPILEN: 0.00ml 
 NICOTINA: 0ml 
 Arom1: 0.00ml
`;
    expect(screen.getByRole('textbox', { name: 'Alquimia' })).toHaveValue(expectedText);
    expect(confirmAlert).toHaveBeenCalledTimes(1); // Only for GLICERINA
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

    expect(screen.getByDisplayValue("150")).toBeInTheDocument(); // Value should be present in input
    
    const totalMLInput = screen.getByPlaceholderText('ml');
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    const expectedText = `ML TOTAL: 100ml 
 GLICERINA: 0ml 
 PROPILEN: -150.00ml 
 NICOTINA: 0ml 
 Arom1: 150.00ml
`;
    expect(screen.getByRole('textbox', { name: 'Alquimia' })).toHaveValue(expectedText);
    expect(confirmAlert).toHaveBeenCalledTimes(2); // One for GLICERINA, one for negative PG
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar mas % de Propilengligol o menos cantidad de aroma/nicotina',
    }));
  });

  test("should handle percentage less than 0", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "-50" } });
    expect(screen.getByDisplayValue("-50")).toBeInTheDocument();

    const totalMLInput = screen.getByPlaceholderText('ml');
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    const expectedText = `ML TOTAL: 100ml 
 GLICERINA: 0ml 
 PROPILEN: 50.00ml 
 NICOTINA: 0ml 
 Arom1: -50.00ml
`;
    expect(screen.getByRole('textbox', { name: 'Alquimia' })).toHaveValue(expectedText);
    expect(confirmAlert).toHaveBeenCalledTimes(1); // Only for GLICERINA
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

    expect(screen.getByDisplayValue("")).toBeInTheDocument(); // Name is empty
    expect(screen.getByDisplayValue("50")).toBeInTheDocument();
    
    const totalMLInput = screen.getByPlaceholderText('ml');
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    const expectedText = `ML TOTAL: 100ml 
 GLICERINA: 0ml 
 PROPILEN: 0.00ml 
 NICOTINA: 0ml 
 : 0.00ml
`;
    expect(screen.getByRole('textbox', { name: 'Alquimia' })).toHaveValue(expectedText);
    expect(confirmAlert).toHaveBeenCalledTimes(1); // Only for GLICERINA
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

    expect(screen.getByDisplayValue("")).toBeInTheDocument(); // Percentage is empty
    
    const totalMLInput = screen.getByPlaceholderText('ml');
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    const expectedText = `ML TOTAL: 100ml 
 GLICERINA: 0ml 
 PROPILEN: 0.00ml 
 NICOTINA: 0ml 
 Arom1: 0.00ml
`;
    expect(screen.getByRole('textbox', { name: 'Alquimia' })).toHaveValue(expectedText);
    expect(confirmAlert).toHaveBeenCalledTimes(1); // Only for GLICERINA
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
    
    expect(percentInput.value).toBe("50.5"); // Value should be set
    
    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    const expectedText = `ML TOTAL: 100ml 
 GLICERINA: 0ml 
 PROPILEN: -50.50ml 
 NICOTINA: 0ml 
 Arom1: 50.50ml
`;
    expect(screen.getByRole('textbox', { name: 'Alquimia' })).toHaveValue(expectedText);
    expect(confirmAlert).toHaveBeenCalledTimes(2); // For GLICERINA and negative PG
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar mas % de Propilengligol o menos cantidad de aroma/nicotina',
    }));
  });

  test("should handle multiple aroms and calculate total ML", () => {
    render(<AlchemyCalculator />);
    // First aroma (index 0)
    let aromInputs = screen.getAllByPlaceholderText("nombre del aroma");
    let percentInputs = screen.getAllByLabelText("porcentaje de aroma");
    fireEvent.change(aromInputs[0], { target: { value: "Arom1" } });
    fireEvent.change(percentInputs[0], { target: { value: "50" } });

    // Click "Agregar aroma" to add a new aroma slot (index 1)
    fireEvent.click(screen.getByText("+ Agregar aroma"));

    // Get the newly added aroma inputs (now there are 2)
    aromInputs = screen.getAllByPlaceholderText("nombre del aroma");
    percentInputs = screen.getAllByLabelText("porcentaje de aroma");
    fireEvent.change(aromInputs[1], { target: { value: "Arom2" } });
    fireEvent.change(percentInputs[1], { target: { value: "30" } });

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    const expectedText = `ML TOTAL: 100ml 
 GLICERINA: 0ml 
 PROPILEN: -80.00ml 
 NICOTINA: 0ml 
 Arom1: 50.00ml
 Arom2: 30.00ml
`;
    expect(screen.getByRole('textbox', { name: 'Alquimia' })).toHaveValue(expectedText);
    expect(confirmAlert).toHaveBeenCalledTimes(2); // For GLICERINA and negative PG
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar mas % de Propilengligol o menos cantidad de aroma/nicotina',
    }));
  });

  test("should handle zero input for percentage", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "0" } });
    
    expect(screen.getByDisplayValue("0")).toBeInTheDocument();
    
    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));

    const expectedText = `ML TOTAL: 100ml 
 GLICERINA: 0ml 
 PROPILEN: 0.00ml 
 NICOTINA: 0ml 
 Arom1: 0.00ml
`;
    expect(screen.getByRole('textbox', { name: 'Alquimia' })).toHaveValue(expectedText);
    expect(confirmAlert).toHaveBeenCalledTimes(1); // Only for GLICERINA
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
    fireEvent.click(screen.getByText("+ Agregar aroma"));

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "0" } });
    fireEvent.click(screen.getByText("Calcular"));

    expect(confirmAlert).toHaveBeenCalledTimes(2); // One for ML TOTAL, one for GLICERINA
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe ingresar un valor en "ML TOTAL"',
    }));
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
    expect(screen.getByRole('textbox', { name: 'Alquimia' })).toHaveValue("ML TOTAL: 0ml \n GLICERINA: 0ml \n PROPILEN: NaNml \n NICOTINA: 0ml \n Arom1: NaNml\n"); // Aroma result is NaN if totalML is NaN/0
  });

  test("should trigger confirmAlert for negative input for total ML", async () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    fireEvent.click(screen.getByText("+ Agregar aroma"));

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "-100" } });
    fireEvent.click(screen.getByText("Calcular"));

    expect(confirmAlert).toHaveBeenCalledTimes(1); // Only for GLICERINA, as negative ML TOTAL is a valid number
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
    const expectedText = `ML TOTAL: -100ml 
 GLICERINA: 0ml 
 PROPILEN: 50.00ml 
 NICOTINA: 0ml 
 Arom1: -50.00ml
`;
    expect(screen.getByRole('textbox', { name: 'Alquimia' })).toHaveValue(expectedText);
  });

  test("should handle decimal input for total ML", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    fireEvent.click(screen.getByText("+ Agregar aroma"));

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "12.5" } });
    fireEvent.click(screen.getByText("Calcular"));

    const expectedText = `ML TOTAL: 12.5ml 
 GLICERINA: 0ml 
 PROPILEN: -6.25ml 
 NICOTINA: 0ml 
 Arom1: 6.25ml
`;
    expect(screen.getByRole('textbox', { name: 'Alquimia' })).toHaveValue(expectedText);
    expect(confirmAlert).toHaveBeenCalledTimes(2); // For GLICERINA and negative PG
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar mas % de Propilengligol o menos cantidad de aroma/nicotina',
    }));
  });

  test("should trigger confirmAlert if GLICERINA input is missing/invalid", async () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    fireEvent.click(screen.getByText("Agregar aroma"));

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    // GLICERINA input is intentionally left empty for this test

    fireEvent.click(screen.getByText("Calcular"));

    expect(confirmAlert).toHaveBeenCalledTimes(2); // For GLICERINA and negative PG
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar mas % de Propilengligol o menos cantidad de aroma/nicotina',
    }));
    expect(screen.getByRole('textbox', { name: 'Alquimia' })).toHaveValue("ML TOTAL: 100ml \n GLICERINA: 0ml \n PROPILEN: -50.00ml \n NICOTINA: 0ml \n Arom1: 50.00ml\n");
  });


  test("should trigger confirmAlert if total ML PG is negative", async () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } }); // 50% aroma
    fireEvent.click(screen.getByText("Agregar aroma"));

    const pgInput = screen.getByRole("spinbutton", { name: "PROPILEN" });
    fireEvent.change(pgInput, { target: { value: "10" } }); // 10% PG
    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } }); // 100ml total

    fireEvent.click(screen.getByText("Calcular"));

    // Total ML Arom = 50ml, Total ML PG from form = 10ml, so totalMlPg = (10 - 50) = -40
    expect(confirmAlert).toHaveBeenCalledTimes(2); // For GLICERINA and negative PG
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar un porcentaje de glicerina',
    }));
    expect(confirmAlert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Debe utilizar mas % de Propilengligol o menos cantidad de aroma/nicotina',
    }));
    const expectedText = `ML TOTAL: 100ml 
 GLICERINA: 0ml 
 PROPILEN: -40.00ml 
 NICOTINA: 0ml 
 Arom1: 50.00ml
`;
    expect(screen.getByRole('textbox', { name: 'Alquimia' })).toHaveValue(expectedText);
  });
});
