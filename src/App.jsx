import './App.css'
import React, { useState } from 'react'
import Aroms from "./components/Aroms/Aroms"

const App = () => {
  const [aroms, setAroms] = useState([{ name: "", index: 0, value: "" }]);
  const [form, setForm] = useState([
    { name: "GLICERINA", value: "" },
    { name: "PROPILEN", value: "" },
    { name: "NICOTINA", value: "" }
  ])

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
    setForm(newForm)
  }


  return (
    <div className="container">
      <Aroms aroms={aroms}
        form={form}
        handleChange={handleChange}
        handleFormChange={handleFormChange}
        addAroms={addAroms}
        deleteAroms={deleteAroms} />
    </div>
  );


}

export default App;
