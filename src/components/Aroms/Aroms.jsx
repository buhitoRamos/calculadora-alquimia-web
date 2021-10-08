import React from 'react'
import "./aroms.css"
import PropsTypes from 'prop-types'


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
          maxLength="3"
          value={aroma.value}
          onChange={(ev) => handleChange(aroma, ev)} />
      </div>
    )
  )
}



const Aroms = ({ aroms, form, handleChange, handleFormChange, addAroms, deleteAroms }) => (
  <section className="max-width-section">
    <p className="text-center bg-primary  text-white">Ingreso de aromas y porcentajes</p>
    <div className="input-group mb-1 pt-1">
    <span className="input-group-text" id="ML">{form[0].name}</span>
      <input type="number" className="form-control" placeholder="ML" id={form[0].name}
        aria-describedby="TOTAL ML"
        maxLength="10"
        value={form[0].value}
        onChange={handleFormChange} />
    </div>
    <div className="input-group mb-1" >
      <span className="input-group-text" id="VG">{form[1].name}</span>
      <input type="number" className="form-control" placeholder="%" id={form[1].name}
        aria-describedby="glicerina"
        maxLength="3"
        value={form[1].value}
        onChange={handleFormChange} />
    </div>
    <div className="input-group mb-1">
      <span className="input-group-text" id="PG">{form[2].name}</span>
      <input type="number" className="form-control" placeholder="%" id={form[2].name}
        aria-describedby="propilenglicol"
        maxLength="3"
        value={form[2].value}
        onChange={handleFormChange} />
    </div>
    <div className="input-group mb-1">
      <span className="input-group-text" id="NICO">{form[3].name}</span>
      <input type="number" className="form-control" placeholder="%" id={form[3].name}
        aria-describedby="nicotina"
        maxLength="3"
        value={form[3].value}
        onChange={handleFormChange} />
    </div>

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