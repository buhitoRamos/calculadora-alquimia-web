import React from 'react'
import PropsTypes from 'prop-types'
import AlchemyInput from "../Alchemy-input/AlchemyInput"


const _renderAroms = (aroms, handleChange) => {
  return (
    aroms.map(aroma =>
      <div className="flex items-center gap-2 mb-2" id={aroma.index} key={aroma.index}>
        <input className="w-2/5 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all" id="label"
          placeholder="nombre del aroma" defaultValue={aroma.name} onChange={(ev) => handleChange(aroma, ev)} />
        <input className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
          placeholder="%" aria-label="porcentaje de aroma"
          aria-describedby="ingreso de aroma"
          type="number"
          maxLength="4"
          value={aroma.value}
          onChange={(ev) => handleChange(aroma, ev)} />
      </div>
    )
  )
}



const Aroms = ({ aroms, form, handleChange, handleFormChange, addAroms, deleteAroms }) => (
  <section>
    <AlchemyInput 
    form={form}
    placeHolder1="ml" 
    placeHolder2="%"
    maxLength1="10"
    maxLength2="3"
    text="Ingreso de aromas y porcentajes"
    handleFormChange= {handleFormChange}/>

    <div className="border border-slate-700 rounded-xl p-3 mb-4 max-h-48 overflow-auto bg-slate-900/40">
      {aroms.length === 0 && (
        <p className="text-slate-600 text-xs text-center py-2">No hay aromas añadidos</p>
      )}
      {_renderAroms(aroms, handleChange)}
    </div>
    <div className="flex gap-2">
      <button type="button"
        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-all duration-200 shadow-lg shadow-emerald-900/30"
        onClick={() => addAroms()}>
        + Agregar aroma
      </button>
      <button type="button"
        className="flex-1 bg-slate-700 hover:bg-red-800/70 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-all duration-200 border border-slate-600 hover:border-red-700/50"
        onClick={() => deleteAroms()}>
        − Eliminar
      </button>
    </div>
  </section>
)
Aroms.PropsTypes = {
  handleChange: PropsTypes.func.isRequired,
  handleFormChange :PropsTypes.func.isRequired,
  aroms: PropsTypes.array.isRequired,
  form: PropsTypes.array.isRequired
}

export default Aroms;