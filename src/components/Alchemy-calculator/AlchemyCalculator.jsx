import React, { useState } from 'react'
import Aroms from "../Aroms/Aroms"
import TextArea from '../Text-area/TextArea'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const AlchemyCalculator = () => {
  const [aroms, setAroms] = useState([{ name: "", index: 0, value: "" }]);
  const [form, setForm] = useState(
    [
      { name: "ML TOTAL", value: "" },
      { name: "GLICERINA", value: "" },
      { name: "PROPILEN", value: "" },
      { name: "NICOTINA", value: "" }
    ]
  );
  const [result, setResult] = useState("");

  // Helper function to parse float or return 0 if NaN
  const parseOrDefault = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  const addAroms = () => {
    const index = aroms.length;
    const aroma = { name: "", index, value: "" };
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
        if (id === "label") {
          arom.name = value
        } else {
          // Allow values up to maxLength to be set
          if (value.length <= maxLength) {
            arom.value = value
          }
        }
      }
      return arom
    });
    setAroms(newArom);
  }

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

    const obj = _autoComplete(id, value);
    if (obj.id === "GLICERINA") {
      newForm[2].value = obj.value;
    } else if (obj.id === "PROPILEN") {
      newForm[1].value = obj.value;
    }
    setForm(newForm);
  }

  const _confirmAlert = (title) => {
    confirmAlert({
      title,
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
  }

  const _sumAroms = (totalMLValue) => {
    let totalMlAromPercent = parseOrDefault(form[3].value); // Nicotine percentage
    aroms.forEach(el => {
      totalMlAromPercent += parseOrDefault(el.value); // Aroma percentages
    });
    return totalMlAromPercent * totalMLValue / 100;
  };

  const calculate = () => {
    let text = "";

    const totalMLValue = parseOrDefault(form[0].value);
    if (totalMLValue <= 0) {
      _confirmAlert('Debe ingresar un valor en "ML TOTAL"');
      setResult(""); // Clear result if ML TOTAL is invalid
      return;
    }
    text += `${form[0].name}: ${totalMLValue.toFixed(2)}ml \n`;

    const glicerinaPercent = parseOrDefault(form[1].value);
    if (glicerinaPercent === 0) {
      _confirmAlert('Debe utilizar un porcentaje de glicerina');
    }

    const propilenPercent = parseOrDefault(form[2].value);
    const nicotinaPercent = parseOrDefault(form[3].value);

    const totalMlArom = _sumAroms(totalMLValue); // This includes nicotine contribution in ML

    // Calculate actual ML for Propilenglicol
    let totalMlPg = (propilenPercent * totalMLValue / 100) - totalMlArom;

    if (totalMlPg < 0) {
      _confirmAlert('Debe utilizar mas % de Propilengligol o menos cantidad de aroma/nicotina');
    }

    text += `${form[1].name}: ${(glicerinaPercent * totalMLValue / 100).toFixed(2)}ml \n`;
    text += `${form[2].name}: ${totalMlPg.toFixed(2)}ml \n`;
    text += `${form[3].name}: ${(nicotinaPercent * totalMLValue / 100).toFixed(2)}ml \n`;

    aroms.forEach(el => {
      const aromaValuePercent = parseOrDefault(el.value);
      text += `${(el.name || 'aroma')}: ${(aromaValuePercent * totalMLValue / 100).toFixed(2)}ml\n`;
    });

    setResult(text);
  };

  const clear = () => {
    setResult("");
    setAroms([]);
    setForm(
      [
        { name: "ML TOTAL", value: "" },
        { name: "GLICERINA", value: "" },
        { name: "PROPILEN", value: "" },
        { name: "NICOTINA", value: "" }
      ]
    )
  }

  const _autoComplete = (id, val) => {
    const value = val === "" ? "" : 100 - val;
    const obj = {
      id,
      value
    }
    return obj
  }

  return (
    <section>
      <div className="flex flex-wrap gap-4">
        <div className="w-full md:w-[48%]">
          <Aroms aroms={aroms}
            form={form}
            handleChange={handleChange}
            handleFormChange={handleFormChange}
            addAroms={addAroms}
            deleteAroms={deleteAroms}/>
        </div>

        <div className="w-full md:flex-1">
          <TextArea result={result}
          Type="Alquimia"
          headerClass="bg-violet-900/40 text-violet-300 border border-violet-700/30"
          Class="bg-slate-900/60 text-violet-200 w-full h-full min-h-[14rem] border border-violet-800/30 font-mono text-sm p-4 rounded-lg shadow-inner block resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
          calcBtnClass="bg-violet-600 hover:bg-violet-500 shadow-violet-900/30"
          calculate={calculate}
          clear={clear} />
        </div>
      </div>
    </section>
  );
}

export default AlchemyCalculator;
