import React from 'react'


const _renderAroms = (aroms, handleChange) => {
  return (
    aroms.map(aroma =>
      <div className="input-group mb-3" id={aroma.index} key={aroma.index}>
        <input className="input-group-text" id="label"
          placeholder="aroma" defaultValue={aroma.name} onChange={(ev) => handleChange(aroma, ev)} />
        <input className="form-control"
          placeholder="ingrese porcentaje" aria-label="input"
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
  <section>
    <p className="text-center bg-primary  text-white">Ingreso de aromas y porcentajes</p>
    <div className="input-group mb-3 pt-1">
      <span className="input-group-text" id="basic-addon1">{form[0].name}</span>
      <input type="number" className="form-control" placeholder="ingrese porcentaje" id={form[0].name}
        aria-describedby="glicerina"
        maxLength="3"
        value={form[0].value}
        onChange={handleFormChange} />
    </div>
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">{form[1].name}</span>
      <input type="number" className="form-control" placeholder="ingrese porcentaje" id={form[1].name}
        aria-describedby="propilenglicol"
        maxLength="3"
        value={form[1].value}
        onChange={handleFormChange} />
    </div>
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">{form[2].name}</span>
      <input type="number" className="form-control" placeholder="ingrese porcentaje" id={form[2].name}
        aria-describedby="nicotina"
        maxLength="3"
        value={form[2].value}
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

export default Aroms;