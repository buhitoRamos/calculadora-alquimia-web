import React from "react";
import PropsTypes from 'prop-types'


const AlchemyInput = ({ form, handleFormChange, text, placeHolder1, placeHolder2, maxLength1, maxLength2 }) => (

  <section>
    <p className="text-center bg-primary  text-white">{text}</p>
    <div className="input-group mb-1 pt-1">
      <span className="input-group-text" id="ML">{form[0].name}</span>
      <input type="number" className="form-control" placeholder={placeHolder1} id={form[0].name}
        aria-describedby="TOTAL ML"
        maxLength={maxLength1}
        value={form[0].value}
        onChange={handleFormChange} />
    </div>
    <div className="input-group mb-1" >
      <span className="input-group-text" id="VG">{form[1].name}</span>
      <input type="number" className="form-control" placeholder={placeHolder2} id={form[1].name}
        aria-describedby="glicerina"
        maxLength={maxLength2}
        value={form[1].value}
        onChange={handleFormChange} />
    </div>
    <div className="input-group mb-1">
      <span className="input-group-text" id="PG">{form[2].name}</span>
      <input type="number" className="form-control" placeholder={placeHolder2} id={form[2].name}
        aria-describedby="propilenglicol"
        maxLength={maxLength2}
        value={form[2].value}
        onChange={handleFormChange} />
    </div>
    <div className="input-group mb-1">
      <span className="input-group-text" id="NICO">{form[3].name}</span>
      <input type="number" className="form-control" placeholder={placeHolder2} id={form[3].name}
        aria-describedby="nicotina"
        maxLength={maxLength2}
        value={form[3].value}
        onChange={handleFormChange} />
    </div>
  </section>

)
AlchemyInput.PropsTypes = {
  handleChange: PropsTypes.func.isRequired,
  form: PropsTypes.array.isRequired
}
export default AlchemyInput