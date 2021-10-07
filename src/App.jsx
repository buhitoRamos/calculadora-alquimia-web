import './App.css'
import React, { useState } from 'react'
import Aroms from "./components/Aroms/Aroms"
import TextArea from './components/TextArea/TextArea'

const App = () => {
  const [aroms, setAroms] = useState([{ name: "", index: 0, value: "" }]);
  const [form, setForm] = useState([
    { name: "GLICERINA", value: "" },
    { name: "PROPILEN", value: "" },
    { name: "NICOTINA", value: "" }
  ])
  const [result, setResult] = useState("");

  const addAroms = () => {
    const index = aroms.length;
    const aroma = {name: "", index, value: ""  };
    setAroms([...aroms, aroma])
  };

  const deleteAroms = () => {
    const idToDeleted = aroms.length - 1;
    const newAroms = aroms.filter(({ index }) => index !== idToDeleted);
    setAroms(newAroms)
  }

  const handleChange = (aroma, event) => {
    const { index } = aroma;
    const { value, id, maxLength } = event.target;
    let newArom = aroms.map(function (arom) {
      if (arom.index === index) {
        if(id === "label") {
          arom.name = value 
        } else {
          if(value.length < maxLength) {
            arom.value = value
          }
        }
      }
      return arom
    });
    setAroms(newArom);
  }
  const handleFormChange = (ev) => {
    const { id } = ev.target
    const { value, maxLength } = ev.target;
    let newForm = form.map(function (form) {
      if (form.name === id) {
       if(value.length < maxLength) {
         form.value = value
       }
        
      }
      return form
    });
    
    const obj = _autoComplete(id, value);
    if(obj.id === "GLICERINA") {
      newForm[1].value =  obj.value;
    } else if (obj.id === "PROPILEN") {
      newForm[0].value =  obj.value;
    }
    
    
    setForm(newForm)
  }
  const _calculate = () => {
    let text = ""
    form.forEach(el => {
      text=`${text} ${el.name}: ${el.value}ml \n`
    });
    setResult(text)
  }
  const _clear =() => {
    setResult("");
    setAroms([{ name: "", index: 0, value: "" }])
    setForm([
      { name: "GLICERINA", value: "" },
      { name: "PROPILEN", value: "" },
      { name: "NICOTINA", value: "" }
    ])

  }

  const _autoComplete = (id, val) => {
    const value = val === "" ? 0 : 100 - val ;
    const obj = {
      id,
      value
    }
    return obj
  }


  return (
    <div className="container mt-1">
      <div className="row">
        <div className="col-6">
          <Aroms aroms={aroms}
            form={form}
            handleChange={handleChange}
            handleFormChange={handleFormChange}
            addAroms={addAroms}
            deleteAroms={deleteAroms} />
        </div>

        <div className="col-6">
          <div className="text-center text-white bg-danger">
          <h4>calculadora de alquimia</h4>
          <p>by buh!to</p>
          </div>         
          <TextArea result={result}/>
          <button type="button"
          className="btn btn-secondary w-100"
          onClick={() => _calculate()}
          >
          Calcular
        </button>
        <button type="button"
          className="btn btn-danger mt-1 w-100"
          onClick={() => _clear()}
          >
          Reset
        </button>
        </div>
      </div>
    </div>

  );


}

export default App;
