import React from 'react'
import PropTypes from 'prop-types'


const TextArea = ({ result, calculate, clear, Class, Type, headerClass, calcBtnClass }) => (
  <section className="flex flex-col h-full">
    <div className={`text-center text-xs font-semibold uppercase tracking-widest p-2.5 rounded-lg mb-3 ${headerClass}`}>
      {Type}
    </div>
    <textarea className={Class} defaultValue={result} aria-label={Type} />
    <div className="flex gap-2 mt-3">
      <button type="button"
        className={`flex-1 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-all duration-200 shadow-lg ${calcBtnClass}`}
        onClick={() => calculate()}>
        Calcular
      </button>
      <button type="button"
        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-all duration-200 border border-slate-600"
        onClick={() => clear()}>
        Reset
      </button>
    </div>
  </section>
)
TextArea.propTypes = {
  result: PropTypes.string.isRequired,
  Class: PropTypes.string.isRequired,
  Type: PropTypes.string.isRequired,
  headerClass: PropTypes.string,
  calcBtnClass: PropTypes.string,
}
TextArea.defaultProps = {
  result: '',
  headerClass: 'bg-slate-700 text-slate-300',
  calcBtnClass: 'bg-violet-600 hover:bg-violet-500 shadow-violet-900/30',
}
export default TextArea
