import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OhmsCalculator from '../components/Ohms-calculator/OhmsCalculator';

describe('OhmsCalculator', () => {
  test('renders the component with default values', () => {
    render(<OhmsCalculator />);
    // Add your test assertions here
  });
});
