import React, { useState } from 'react'
import AlchemyCalculator from './components/Alchemy-calculator/AlchemyCalculator'
import OhmsCalculator from './components/Ohms-calculator/OhmsCalculator'
import 'react-confirm-alert/src/react-confirm-alert.css'

const App = () => {

  const [isAlchemy, setIsAlchemy] = useState(true);

  if (isAlchemy) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <button type="button"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => setIsAlchemy(!isAlchemy)}>
                Cambiar a modo Ley de Ohm
            </button>
        <AlchemyCalculator />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <button type="button"
                className="w-full bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => setIsAlchemy(!isAlchemy)}>
                Cambiar a modo Alquimia
            </button>
        <OhmsCalculator/>
        </div>
      </div>
    )
  }

}

export default App;
