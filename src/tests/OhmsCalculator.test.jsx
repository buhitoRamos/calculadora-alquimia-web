import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OhmsCalculator from '../src/components/Ohms-calculator/OhmsCalculator';

describe('OhmsCalculator', () => {
  test('renders the component with default values', () => {
    render(<OhmsCalculator />);
    // Add your test assertions here
  });
});
