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
  const [result, setResult] = useState("");
  const handleFormChange = (ev) => {
    const { id } = ev.target;
    const { value, maxLength } = ev.target;
    let newForm = form.map(function (form) {
      if (form.name === id) {
        if (value.length < maxLength + 1) {
          form.value = value;
        }
      }

      return form
    });


    setForm(newForm);
  }
  const _amperCalculate = (volt, ohms, watt) => {
    let aux = " Amper: "
    if (volt > 0 && ohms > 0) {
      aux = aux + (volt / ohms).toFixed(2);
    } else if (volt > 0 && watt > 0) {
      aux = aux + (watt / volt).toFixed(2);
    } else if (watt > 0 && ohms > 0) {
      aux = aux + (Math.sqrt(watt / ohms)).toFixed(2);
    }

    return aux;
  }
  const _ohmsCalculate = (volt, watt, amp) => {
    let aux = "Ohms: ";
    if (volt > 0 && amp > 0) {
      aux = aux + (volt / amp).toFixed(2);
    } else if (volt > 0 && watt > 0) {
      aux = aux + (volt * volt / watt).toFixed(2);
    } else if (watt > 0 && amp > 0) {
      aux = aux + (watt / (amp * amp)).toFixed(2);
    }
    return aux;
  };
  const _wattCalculate = (amp, ohms, volt) => {
    let aux = "Watt: ";
    if (volt > 0 && amp > 0) {
      aux = aux + (volt * amp).toFixed(2);
    } else if (volt > 0 && ohms > 0) {
      aux = aux + ((volt * volt) / ohms).toFixed(2);
    } else if (ohms > 0 && amp > 0) {
      aux = aux + ((amp * amp) * ohms).toFixed(2);
    }
    return aux;
  }
  const _voltCalculate = (amp, watt, ohms) => {
    let aux = "Volt: ";
    if (amp > 0 && ohms > 0) {
      aux = aux + (amp * ohms).toFixed(2);
    } else if (watt > 0 && amp > 0) {
      aux = aux + (watt / amp).toFixed(2);
    } else if (watt > 0 && ohms > 0) {
      aux = aux + Math.sqrt(watt * ohms).toFixed(2);
    }
    return aux
  }
  const calculate = () => {
    let cont = 0;
    form.map(function (form) {
      if (form.value > 0) {
        cont++
      }
      return ""
    });
    if (cont === 2) {
      const volt = form[0].value;
      const watt = form[1].value;
      const ohms = form[2].value;
      const amp = form[3].value;
      let text = amp === "" ? _amperCalculate(volt, ohms, watt) : ` Amper: ${amp}`;
      text = text + "\n";
      text = ohms === "" ? `${text} ${_ohmsCalculate(volt, watt, amp)}` : `${text} Ohms: ${ohms}`;
      text = text + "\n";
      text = watt === "" ? `${text} ${_wattCalculate(amp, volt, ohms)}` : `${text} Watt: ${watt}`;
      text = text + "\n";
      text = volt === "" ? `${text} ${_voltCalculate(amp, watt, ohms)}` : `${text} Volt: ${volt}`;
      setResult(text);
    } else {
      setResult("Se denbe ingresar solo 2 valores para calcular el resto");
    }
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
    setResult("")
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
            text="Ingrese solo 2 valores" />
        </div>
        <div className="col-6">
          <TextArea Class="text-area-ohms"
            result={result}
            Type="Ley de ohm by Buh!to"
            calculate={calculate}
            clear={clear} />
        </div>
      </div>
    </section>
  )
}
export default OhmsCalculator