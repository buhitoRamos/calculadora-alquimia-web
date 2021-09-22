import './App.css'
import React, { useState } from 'react'

const App = ()=> {
  const [isAddAroms, setIsAddAroms]= useState(false)
  const [aromsName, setAromsName] = useState(
    ["AROMA 1", "AROMA 2", "AROMA 3", "AROMA 4", "AROMA 5", "AROMA 6", "AROMA 7", "AROMA 8", "AROMA 9", "AROMA 10"]
    );

  const _addMoreAroms = (isAddAroms) => {
    setIsAddAroms(!isAddAroms)
    console.log(isAddAroms)
  };


  const _renderAroms = () => {
   
      return (
        aromsName.map(aroma =>
          

          <div className="input-group mb-3" id={aroma}>
            <span className="input-group-text" id="basic-addon1">{aroma}</span>
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
          
        
        <div className="position-relative">
          <button type="button" 
          className="btn btn-primary position-absolute top-0 start-50 translate-middle-x"
          onClick={()=> _addMoreAroms(isAddAroms)}>
            Agregar mas Aromas</button>
        </div>
      </div>
    );
  
  
}

export default App;
