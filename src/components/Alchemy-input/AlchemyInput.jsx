import React from "react";
import PropsTypes from 'prop-types'


const AlchemyInput = ({ form, handleFormChange, text, placeHolder1, placeHolder2, maxLength1, maxLength2 }) => (

  <section className="mb-4">
    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 border-b border-slate-700 pb-2.5 mb-4">
      {text}
    </p>
    <div className="space-y-2">
      <div className="flex items-stretch">
        <span className="w-28 shrink-0 flex items-center justify-center px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-l-lg text-xs font-semibold text-slate-300 uppercase tracking-wide">
          {form[0].name}
        </span>
        <input type="number"
          className="flex-1 px-3 py-2.5 bg-slate-900/50 border border-slate-600 border-l-0 rounded-r-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
          placeholder={placeHolder1} id={form[0].name}
          aria-describedby="TOTAL ML"
          maxLength={maxLength1}
          value={form[0].value}
          onChange={handleFormChange} />
      </div>
      <div className="flex items-stretch">
        <span className="w-28 shrink-0 flex items-center justify-center px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-l-lg text-xs font-semibold text-slate-300 uppercase tracking-wide">
          {form[1].name}
        </span>
        <input type="number"
          className="flex-1 px-3 py-2.5 bg-slate-900/50 border border-slate-600 border-l-0 rounded-r-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
          placeholder={placeHolder2} id={form[1].name}
          aria-describedby="glicerina"
          maxLength={maxLength2}
          value={form[1].value}
          onChange={handleFormChange} />
      </div>
      <div className="flex items-stretch">
        <span className="w-28 shrink-0 flex items-center justify-center px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-l-lg text-xs font-semibold text-slate-300 uppercase tracking-wide">
          {form[2].name}
        </span>
        <input type="number"
          className="flex-1 px-3 py-2.5 bg-slate-900/50 border border-slate-600 border-l-0 rounded-r-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
          placeholder={placeHolder2} id={form[2].name}
          aria-describedby="propilenglicol"
          maxLength={maxLength2}
          value={form[2].value}
          onChange={handleFormChange} />
      </div>
      <div className="flex items-stretch">
        <span className="w-28 shrink-0 flex items-center justify-center px-3 py-2.5 bg-slate-700 border border-slate-600 rounded-l-lg text-xs font-semibold text-slate-300 uppercase tracking-wide">
          {form[3].name}
        </span>
        <input type="number"
          className="flex-1 px-3 py-2.5 bg-slate-900/50 border border-slate-600 border-l-0 rounded-r-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
          placeholder={placeHolder2} id={form[3].name}
          aria-describedby="nicotina"
          maxLength={maxLength2}
          value={form[3].value}
          onChange={handleFormChange} />
      </div>
    </div>
  </section>

)
AlchemyInput.PropsTypes = {
  handleChange: PropsTypes.func.isRequired,
  form: PropsTypes.array.isRequired
}
export default AlchemyInput