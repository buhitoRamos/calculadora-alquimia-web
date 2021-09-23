import './App.css'
import React, { useState } from 'react'

const App = ()=> {
  const [aromsName, setAromsName] = useState([{value:"AROMA", id:0}]);

  const _addAroms = () => {
    const id=aromsName.length;
    const aroma = {value:"AROMA", id};
    setAromsName([ ...aromsName, aroma])
  };
  const _deleteAroms = () => {
   const idToDeleted = aromsName.length -1;
   const newAromsName = aromsName.filter(({id}) => id !== idToDeleted);
   setAromsName(newAromsName)
  }


  const _renderAroms = () => {
      return (
        aromsName.map(aroma =>
          
          <div className="input-group mb-3" id={aroma.value}>
            <span className="input-group-text" id="basic-addon1">{aroma.value}</span>
            <input type="text" className="form-control" placeholder="ingrese porcentaje" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        )
      )
    }

    return (
      <div className="container">
        <div className="input-group mb-3 pt-1">
          <span className="input-group-text" id="basic-addon1">GLICERINA</span>
          <input type="text" className="form-control" placeholder="ingrese porcentaje" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">PROPILEN</span>
          <input type="text" className="form-control" placeholder="ingrese porcentaje" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">NICOTINA</span>
          <input type="text" className="form-control" placeholder="ingrese porcentaje" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <div className="overFlow">
{
            _renderAroms()
          }
        </div>
          
        
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
