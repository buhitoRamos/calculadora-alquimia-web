import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AlchemyCalculator from "../components/Alchemy-calculator/AlchemyCalculator";

describe("AlchemyCalculator", () => {
  test("should add aroms and calculate total ML", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    fireEvent.click(screen.getByText("Agregar"));
    expect(screen.getByText("Arom1")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));
    expect(screen.getByText("Total ML Arom: 50")).toBeInTheDocument();
  });

  test("should handle clear button", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    fireEvent.click(screen.getByText("Agregar"));
    expect(screen.getByText("Arom1")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Limpiar"));
    expect(aromInput.value).toBe("");
    expect(percentInput.value).toBe("");
    expect(screen.queryByText("Arom1")).not.toBeInTheDocument();
    expect(screen.queryByText("50%")).not.toBeInTheDocument();
  });

  test("should handle invalid input for arom name", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "123" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    fireEvent.click(screen.getByText("Agregar"));
    expect(screen.queryByText("Arom1")).not.toBeInTheDocument();
  });

  test("should handle invalid input for percentage", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "abc" } });
    fireEvent.click(screen.getByText("Agregar"));
    expect(screen.queryByText("Arom1")).not.toBeInTheDocument();
  });

  test("should handle percentage greater than 100", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "150" } });
    fireEvent.click(screen.getByText("Agregar"));
    expect(screen.queryByText("Arom1")).not.toBeInTheDocument();
  });

  test("should handle percentage less than 0", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "-50" } });
    fireEvent.click(screen.getByText("Agregar"));
    expect(screen.queryByText("Arom1")).not.toBeInTheDocument();
  });

  test("should handle empty input for arom name", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    fireEvent.click(screen.getByText("Agregar"));
    expect(screen.queryByText("Arom1")).not.toBeInTheDocument();
  });

  test("should handle empty input for percentage", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "" } });
    fireEvent.click(screen.getByText("Agregar"));
    expect(screen.queryByText("Arom1")).not.toBeInTheDocument();
  });

  test("should handle decimal input for percentage", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50.5" } });
    fireEvent.click(screen.getByText("Agregar"));
    expect(screen.getByText("Arom1")).toBeInTheDocument();
    expect(screen.getByText("50.5%")).toBeInTheDocument();
  });

  test("should handle multiple aroms and calculate total ML", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    fireEvent.click(screen.getByText("Agregar"));

    const aromInput2 = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput2, { target: { value: "Arom2" } });
    const percentInput2 = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput2, { target: { value: "30" } });
    fireEvent.click(screen.getByText("Agregar"));

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "100" } });
    fireEvent.click(screen.getByText("Calcular"));
    expect(screen.getByText("Total ML Arom: 80")).toBeInTheDocument();
  });

  test("should handle zero input for percentage", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "0" } });
    fireEvent.click(screen.getByText("Agregar"));
    expect(screen.queryByText("Arom1")).not.toBeInTheDocument();
  });

  test("should handle zero input for total ML", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    fireEvent.click(screen.getByText("Agregar"));

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "0" } });
    fireEvent.click(screen.getByText("Calcular"));
    expect(screen.queryByText("Total ML Arom: 50")).not.toBeInTheDocument();
  });

  test("should handle negative input for total ML", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    fireEvent.click(screen.getByText("Agregar"));

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "-100" } });
    fireEvent.click(screen.getByText("Calcular"));
    expect(screen.queryByText("Total ML Arom: 50")).not.toBeInTheDocument();
  });

  test("should handle decimal input for total ML", () => {
    render(<AlchemyCalculator />);
    const aromInput = screen.getByPlaceholderText("nombre del aroma");
    fireEvent.change(aromInput, { target: { value: "Arom1" } });
    const percentInput = screen.getByLabelText("porcentaje de aroma");
    fireEvent.change(percentInput, { target: { value: "50" } });
    fireEvent.click(screen.getByText("Agregar"));

    const totalMLInput = screen.getByRole("spinbutton", { name: "ML TOTAL" });
    fireEvent.change(totalMLInput, { target: { value: "12.5" } });
    fireEvent.click(screen.getByText("Calcular"));
    expect(screen.getByText("Total ML Arom: 6.25")).toBeInTheDocument();
  });
});
