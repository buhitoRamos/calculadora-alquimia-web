import React, { useState } from 'react'
import Aroms from "../Aroms/Aroms"
import TextArea from '../Text-area/TextArea'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import "./AlchemyCalculator.css"

const AlchemyCalculator = () => {
  const [aroms, setAroms] = useState([{ name: "", index: 0, value: "" }]);
  const [form, setForm] = useState(
    [
      { name: "ML TOTAL", value: "" },
      { name: "GLICERINA", value: "" },
      { name: "PROPILEN", value: "" },
      { name: "NICOTINA", value: "" }
    ]
  )
  const [result, setResult] = useState("");

  const addAroms = () => {
    const index = aroms.length
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
          if (value.length < maxLength) {
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
        if (value.length < maxLength) {
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

  const _sumAroms = (totalML) => {
    let totalMlArom = parseFloat(form[3].value) ? parseFloat(form[3].value) : 0;
    aroms.forEach(el => {
      let formValue = parseFloat(el.value);
      totalMlArom = totalMlArom + formValue;
    })
    totalMlArom = totalMlArom * totalML / 100;
    return totalMlArom;
  }

  const calculate = () => {
    let text = "";
    const totalML = parseFloat(form[0].value) ? parseFloat(form[0].value) :
      _confirmAlert('Debe ingresar un valor en "ML TOTAL"');
    text = `${text} ${form[0].name}: ${form[0].value}ml \n`
    const totalMlArom = _sumAroms(totalML);
    let totalMlPg = (parseFloat(form[2].value) * totalML / 100) - totalMlArom;
    if (totalMlPg < 0) {
      _confirmAlert('Debe utilizar mas % de Propilengligol o menos cantidad de aroma/nicotina');
    }
    let totalGlicerina = form[1].value ? parseFloat(form[1].value) * totalML / 100 :
      _confirmAlert('Debe utilizar un porcentaje de glicerina');;
    text = `${text} ${form[1].name}: ${totalGlicerina}ml \n`
    text = `${text} ${form[2].name}: ${totalMlPg}ml \n`
    let mlNico = form[3].value ? form[3].value * totalML / 100 : 0;
    text = `${text} ${form[3].name}: ${mlNico}ml \n`

    aroms.forEach(el => {
      let aromsValue = parseFloat(el.value);
      aromsValue = totalML * aromsValue / 100;
      aromsValue = aromsValue ? `${aromsValue}ml` : 'sin valor'
      let name = el.name ? el.name : 'aroma'
      text = `${text} ${name}: ${aromsValue}\n`
    })
    setResult(text)
  }

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
    <section className="container mt-1">
      <div className="row">
        <div className="col-6">
          <Aroms aroms={aroms}
            form={form}
            handleChange={handleChange}
            handleFormChange={handleFormChange}
            addAroms={addAroms}
            deleteAroms={deleteAroms}/>
        </div>

        <div className="col-6">
          <TextArea result={result}
          Type="Calculadora de alquimia by buh!to"
          Class="text-area-alchemy"
          calculate={calculate}
          clear={clear} />
        </div>
      </div>
    </section>
  );
}

export default AlchemyCalculator;