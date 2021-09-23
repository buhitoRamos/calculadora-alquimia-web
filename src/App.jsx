import './App.css'
import React, { useState } from 'react'

const App = ()=> {
  const [aromsName, setAromsName] = useState(
    [{aroma:"AROMA 1"}, {aroma:"AROMA 2"}, {aroma:"AROMA 3"}]
    );

  const _addMoreAroms = () => {
    const aroma="AROMA 11"
   setAromsName({...aromsName,
    aroma
  });
 
  };


  const _renderAroms = () => {
   
      return (
        aromsName.map(aroma =>
          

          <div className="input-group mb-3" id={aroma.aroma}>
            <span className="input-group-text" id="basic-addon1">{aroma.aroma}</span>
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
          onClick={()=> _addMoreAroms()}>
            Agregar mas Aromas</button>
        </div>
      </div>
    );
  
  
}

export default App;
