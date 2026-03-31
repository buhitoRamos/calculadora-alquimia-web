import React from 'react'
import "./aroms.css"
import PropsTypes from 'prop-types'
import AlchemyInput from "../Alchemy-input/AlchemyInput"


const _renderAroms = (aroms, handleChange) => {
  return (
    aroms.map(aroma =>
      <div className="input-group mb-1" id={aroma.index} key={aroma.index}>
        <input className="input-group-text max-width-lbl" id="label"
          placeholder="aroma" defaultValue={aroma.name} onChange={(ev) => handleChange(aroma, ev)} />
        <input className="form-control max-width-input"
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

    <div className="overFlow">
      {
        _renderAroms(aroms, handleChange)
      }
    </div>
    <div className="mp-2">
      <span className=" row align-items-center mr-50">
        <button type="button"
          className="btn btn-primary"
          onClick={() => addAroms()}>
          Agregar aroma
        </button>
        <button type="button"
          className="btn btn-danger mt-1"
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