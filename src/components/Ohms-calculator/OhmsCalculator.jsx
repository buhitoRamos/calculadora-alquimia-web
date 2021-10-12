import React, { useState } from 'react'
import TextArea from "../Text-area/TextArea";
import AlchemyInput from "../Alchemy-input/AlchemyInput";

const OhmsCalculator = () => {
  const [form, setForm] = useState(
    [
      { name: "VOLTIOS", value: "" },
      { name: "WATT", value: "" },
      { name: "OHMS", value: "" },
      { name: "AMPER", value: "" }
    ]
  )
  const handleFormChange = (ev) => {
    const { id } = ev.target;
    const { value, maxLength } = ev.target;
    let newForm = form.map(function (form) {
      if (form.name === id) {
        if (value.length < maxLength+1) {
          form.value = value;
        }

      }
      return form
    });


    setForm(newForm);
  }
  const _amperCalculate =(volt, ohms, watt) => {
      let aux = ""
      if(volt > 0 && ohms > 0) {
        aux = volt/ohms;   
      } else if(volt > 0 && watt > 0) {
        aux = watt/volt;
      } else if(watt > 0 && ohm > 0){
          aux = Math.sqrt(watt / ohms);
      }
      
    return aux
  }
  const _ohmsCalculate = (volt, watt, amp) => {
      let aux =""
      if(volt > 0 && amp > 0 ){
        aux = volt/amp
      } else if (volt > 0 && watt > 0 ) {
          aux = vot* volt / watt;
      } else if (watt > 0 && amp > 0) {
          aux =watt /(amp*amp);
      }
      return aux;
  }
  const calculate = () => {
      const volt = form[0].value;
      const watt = form[1].value;
      const ohms = form[2].value;
      const amp = form[3].value;
      let text = _amperCalculate(volt, ohms, watt);
      text = `/n ${text} ${_ohmsCalculate}`;
    
      

  }
  const clear = () => {
    
    setForm(
      [
          { name: "VOLTIOS", value: "" },
          { name: "WATT", value: "" },
          { name: "OHMS", value: "" },
          { name: "AMPER", value: "" }
      ]
    )
  }


  return (
    <section className="container mt-1">
      <div className="row">
        <div className="col-6">
          <AlchemyInput
            maxLength1="4"
            maxLength2="4"
            placeHolder1="ingrese valor"
            placeHolder2="ingrese valor"
            form={form}
            handleFormChange={handleFormChange}
            text="calculo de ohmios" />
        </div>
        <div className="col-6">
          <TextArea Class="text-area-ohms"
            Type="Calculadora de ohmios by Buh!to"
            calculate={()=>console.log("calcular")}
          clear={clear} />
        </div>
      </div>
    </section>
  )
}
export default OhmsCalculator