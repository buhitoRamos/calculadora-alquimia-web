import React from 'react'
import PropsTypes from 'prop-types'
import AlchemyInput from "../Alchemy-input/AlchemyInput"


const _renderAroms = (aroms, handleChange) => {
  return (
    aroms.map(aroma =>
      <div className="flex items-center mb-2" id={aroma.index} key={aroma.index}>
        <input className="flex-none w-1/3 p-2 bg-gray-200 border border-gray-300 rounded-l text-sm" id="label"
          placeholder="aroma" defaultValue={aroma.name} onChange={(ev) => handleChange(aroma, ev)} />
        <input className="flex-grow p-2 border border-gray-300 rounded-r text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="%" aria-label="input"
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

    <div className="border border-gray-300 rounded p-2 mb-4 max-h-48 overflow-auto bg-gray-50">
      {
        _renderAroms(aroms, handleChange)
      }
    </div>
    <div className="mt-4">
      <span className="flex justify-between items-center">
        <button type="button"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => addAroms()}>
          Agregar aroma
        </button>
        <button type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => deleteAroms()}>
          Eliminar aroma
        </button>
      </span>
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