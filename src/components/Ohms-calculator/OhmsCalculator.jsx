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
    const parsedFormValues = form.map(item => {
      const parsedValue = parseFloat(item.value);
      if (!isNaN(parsedValue) && parsedValue > 0) {
        cont++;
      }
      return parsedValue;
    });

    if (cont === 2) {
      const volt = parsedFormValues[0];
      const watt = parsedFormValues[1];
      const ohms = parsedFormValues[2];
      const amp = parsedFormValues[3];

      let text = "";
      if (amp === 0 || isNaN(amp)) { // If amp is not provided or invalid, calculate it
        text += _amperCalculate(volt, ohms, watt);
      } else { // Otherwise, use the provided amp
        text += ` Amper: ${amp.toFixed(2)}`;
      }
      text += "\n";

      if (ohms === 0 || isNaN(ohms)) {
        text += _ohmsCalculate(volt, watt, amp);
      } else {
        text += `Ohms: ${ohms.toFixed(2)}`;
      }
      text += "\n";

      if (watt === 0 || isNaN(watt)) {
        text += _wattCalculate(amp, volt, ohms);
      } else {
        text += `Watt: ${watt.toFixed(2)}`;
      }
      text += "\n";

      if (volt === 0 || isNaN(volt)) {
        text += _voltCalculate(amp, watt, ohms);
      } else {
        text += `Volt: ${volt.toFixed(2)}`;
      }
      setResult(text);
    } else {
      setResult(""); // Clear result if not exactly two positive inputs
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
    <section>
      <div className="flex flex-wrap gap-4">
        <div className="w-full md:w-[48%]">
          <AlchemyInput
            maxLength1="4"
            maxLength2="4"
            placeHolder1="ingrese valor"
            placeHolder2="ingrese valor"
            form={form}
            handleFormChange={handleFormChange}
            text="Ingrese solo 2 valores" />
        </div>
        <div className="w-full md:flex-1">
          <TextArea
            Class="bg-slate-900/60 text-cyan-300 w-full h-full min-h-[14rem] border border-cyan-800/30 font-mono text-sm p-4 rounded-lg shadow-inner block resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
            result={result}
            Type="Ley de Ohm"
            headerClass="bg-cyan-900/40 text-cyan-300 border border-cyan-700/30"
            calcBtnClass="bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/30"
            calculate={calculate}
            clear={clear} />
        </div>
      </div>
    </section>
  )
}
export default OhmsCalculator
