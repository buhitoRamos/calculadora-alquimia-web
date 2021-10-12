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
    return (
        <section>
        <AlchemyInput 
        form={form}
        text="calculo de ohmios"/>
        <TextArea Class="text-area-ohms"
        Type="Calculadora de ohmios by Buh!to"/>
        </section>
    )
}
export default OhmsCalculator