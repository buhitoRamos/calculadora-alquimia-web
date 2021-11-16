import React, { useState } from 'react'
import AlchemyCalculator from './components/Alchemy-calculator'
import OhmsCalculator from './components/Ohms-calculator'
import 'react-confirm-alert/src/react-confirm-alert.css'

const App = () => {

  const [isAlchemy, setIsAlchemy] = useState(true);

  if (isAlchemy) {
    return (
      <div className="container">
        <button type="button"
          className="btn btn-danger mt-1 mb-2 w-100"
          onClick={() => setIsAlchemy(!isAlchemy)}>
          cambiar a modo ley de ohm
        </button>
        <AlchemyCalculator />
      </div>

    );
  } else {
    return (
      <div className="container">
       
        <button type="button"
          className="btn btn-dark mt-1 mb-2 w-100"
          onClick={() => setIsAlchemy(!isAlchemy)}>
          cambiar a modo alquimia
        </button>
        <OhmsCalculator/>
      </div>
    )
  }

}

export default App;
