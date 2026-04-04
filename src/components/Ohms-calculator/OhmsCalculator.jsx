import React, { useState } from 'react'
import TextArea from "../Text-area/TextArea";
import AlchemyInput from "../Alchemy-input/AlchemyInput";
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert

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
  const calculate = () => {
    let cont = 0;
    const parsedFormValues = form.map(item => {
      const parsedValue = parseFloat(item.value);
      if (!isNaN(parsedValue) && parsedValue > 0) {
        cont++;
      }
      return parsedValue;
    });

    let volt = parsedFormValues[0];
    let watt = parsedFormValues[1];
    let ohms = parsedFormValues[2];
    let amper = parsedFormValues[3];
    let text = "";

    if (cont !== 2) {
      confirmAlert({
        title: 'Se denbe ingresar solo 2 valores para calcular el resto',
        message: `La operación no se puede realizar con exito, pulse reset para volver a comenzar o
                   cancelar para no perder lo guardado y corregir el error.`,
        buttons: [
          {
            label: 'Reset',
            onClick: () => {
              clear()
            }
          },
          {
            label: 'Cancelar',
          }
        ]
      });
      setResult("");
      return;
    }

    // Derive all four values based on the two inputs
    if (volt > 0 && ohms > 0) {
      amper = volt / ohms;
      watt = volt * amper;
    } else if (volt > 0 && watt > 0) {
      amper = watt / volt;
      ohms = volt / amper;
    } else if (volt > 0 && amper > 0) {
      ohms = volt / amper;
      watt = volt * amper;
    } else if (watt > 0 && ohms > 0) {
      volt = Math.sqrt(watt * ohms);
      amper = watt / volt;
    } else if (watt > 0 && amper > 0) {
      volt = watt / amper;
      ohms = volt / amper;
    } else if (ohms > 0 && amper > 0) {
      volt = amper * ohms;
      watt = volt * amper;
    }

    text += `Amper: ${amper.toFixed(2)}\n`;
    text += `Ohms: ${ohms.toFixed(2)}\n`;
    text += `Watt: ${watt.toFixed(2)}\n`;
    text += `Volt: ${volt.toFixed(2)}`;

    setResult(text);
  };
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
