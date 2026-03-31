import React from "react";
import PropsTypes from 'prop-types'


const AlchemyInput = ({ form, handleFormChange, text, placeHolder1, placeHolder2, maxLength1, maxLength2 }) => (

  <section>
    <p className="text-center text-lg font-semibold bg-blue-600 text-white p-2 rounded-t-lg mb-4">{text}</p>
    <div className="input-group mb-1 pt-1">
      <span className="flex-none w-1/3 p-3 bg-gray-200 border border-gray-300 rounded-l text-base font-medium text-gray-700" id="ML">{form[0].name}</span>
      <input type="number" className="flex-grow p-3 border border-gray-300 rounded-r text-base focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={placeHolder1} id={form[0].name}
        aria-describedby="TOTAL ML"
        maxLength={maxLength1}
        value={form[0].value}
        onChange={handleFormChange} />
    </div>
    <div className="flex items-center mb-3" >
      <span className="flex-none w-1/3 p-3 bg-gray-200 border border-gray-300 rounded-l text-base font-medium text-gray-700" id="VG">{form[1].name}</span>
      <input type="number" className="flex-grow p-3 border border-gray-300 rounded-r text-base focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={placeHolder2} id={form[1].name}
        aria-describedby="glicerina"
        maxLength={maxLength2}
        value={form[1].value}
        onChange={handleFormChange} />
    </div>
    <div className="flex items-center mb-3">
      <span className="flex-none w-1/3 p-3 bg-gray-200 border border-gray-300 rounded-l text-base font-medium text-gray-700" id="PG">{form[2].name}</span>
      <input type="number" className="flex-grow p-3 border border-gray-300 rounded-r text-base focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={placeHolder2} id={form[2].name}
        aria-describedby="propilenglicol"
        maxLength={maxLength2}
        value={form[2].value}
        onChange={handleFormChange} />
    </div>
    <div className="flex items-center mb-3">
      <span className="flex-none w-1/3 p-3 bg-gray-200 border border-gray-300 rounded-l text-base font-medium text-gray-700" id="NICO">{form[3].name}</span>
      <input type="number" className="flex-grow p-3 border border-gray-300 rounded-r text-base focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={placeHolder2} id={form[3].name}
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