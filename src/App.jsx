import React, { useState } from 'react'
import AlchemyCalculator from './components/Alchemy-calculator/AlchemyCalculator'
import OhmsCalculator from './components/Ohms-calculator/OhmsCalculator'
import 'react-confirm-alert/src/react-confirm-alert.css'

const App = () => {
  const [isAlchemy, setIsAlchemy] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            {isAlchemy ? '⚗️ Calculadora Alquimia' : '⚡ Ley de Ohm'}
          </h1>
          <p className="text-slate-500 text-xs mt-1 tracking-widest uppercase">by Buh!to</p>
        </div>

        <div className="flex bg-slate-800/60 rounded-xl p-1 mb-6 border border-slate-700/50">
          <button
            type="button"
            className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              isAlchemy
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            onClick={() => setIsAlchemy(true)}
          >
            ⚗️ Alquimia
          </button>
          <button
            type="button"
            className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              !isAlchemy
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            onClick={() => setIsAlchemy(false)}
          >
            ⚡ Ley de Ohm
          </button>
        </div>

        <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 shadow-2xl p-6">
          {isAlchemy ? <AlchemyCalculator /> : <OhmsCalculator />}
        </div>
      </div>
    </div>
  );
};

export default App;
