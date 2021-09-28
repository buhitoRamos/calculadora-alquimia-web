import './App.css'
import React, { useState } from 'react'
import Aroms from"./components/Aroms/Aroms"

const App = () => {
  const [aroms, setAroms] = useState([{ name: "", index: 0, value: "" }]);
  const [form, setForm] = useState([
    {name: "GLICERINA", value:""}, 
    {name:"PROPILEN", value: ""},
    {name: "NICOTINA", value: ""}
    ])

  const _addAroms = () => {
    const index = aroms.length;
    const aroma = { value: "", index };
    setAroms([...aroms, aroma])
  };
  
  const _deleteAroms = () => {
    const idToDeleted = aroms.length - 1;
    const newAroms = aroms.filter(({ index }) => index !== idToDeleted);
    setAroms(newAroms)
  }

  const _handleChange = (aroma, event) => {
    const { index } = aroma;
    const { value } = event.target;
    const {id} = event.target
    let newArom  = aroms.map(function(arom) {
      if(arom.index === index) {
        id === "label" ? arom.name = value : arom.value = value;
      }
      return arom
    });
    setAroms(newArom);
  }
  const _handleFormChange = (ev) => {
    const {id} = ev.target
    const { value } = ev.target;
    let newForm  = form.map(function(form) {
      if(form.name === id) {
        form.value = value
      }
      return form
    });
    setForm(newForm)
  }

  /*const _renderAroms = () => {
    return (
      aroms.map(aroma =>

        <div className="input-group mb-3" id={aroma.index}>
          <input className="input-group-text" id="label"
            placeholder="aroma" defaultValue={aroma.name} onChange={(ev) => _handleChange(aroma, ev)} />
          <input type="text" className="form-control"
            placeholder="ingrese porcentaje" aria-label="input"
            aria-describedby="ingreso de aroma"
            defaultValue={aroma.value} 
            onChange={(ev) => _handleChange(aroma, ev)}/>
        </div>
      )
    )
  }*/


  return (
    <div className="container">
      <p className="text-center bg-primary  text-white">Ingreso de aromas y porcentajes</p>
      <div className="input-group mb-3 pt-1">
        <span className="input-group-text" id="basic-addon1">{form[0].name}</span>
        <input type="number" className="form-control" placeholder="ingrese porcentaje" id={form[0].name} 
        aria-describedby="glicerina" defaultValue={form[0].value}
        onChange={_handleFormChange} />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">{form[1].name}</span>
        <input type="number" className="form-control" placeholder="ingrese porcentaje" id={form[1].name} 
        aria-describedby="propilenglicol"
        onChange={_handleFormChange} />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">{form[2].name}</span>
        <input type="number" className="form-control" placeholder="ingrese porcentaje" id={form[2].name}
         aria-describedby="nicotina"
         onChange={_handleFormChange} />
      </div>
      <Aroms aroms={aroms} handleChange={_handleChange} />


      <div className="mp-2">
        <span className=" row align-items-center mr-50">
          <button type="button"
            className="btn btn-primary"
            onClick={() => _addAroms()}>
            Agregar aroma
          </button>
          <button type="button"
            className="btn btn-danger mt-1"
            onClick={() => _deleteAroms()}>
            Eliminar aroma
          </button>
        </span>
      </div>
    </div>
  );


}

export default App;
