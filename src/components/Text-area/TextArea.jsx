import React from 'react'
import PropTypes from 'prop-types'


const TextArea = ({ result, calculate, clear, Class, Type }) => (
  <section>
    <div className="text-center text-lg font-semibold bg-red-600 text-white p-2 rounded-t-lg mb-4">
      <p>{Type}</p>
    </div>
    <textarea className={Class} defaultValue={result} />
    <button type="button"
      className="w-full bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mb-2"
      onClick={() => calculate()}>
      Calcular
    </button>
    <button type="button"
      className="w-full bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
      onClick={() => clear()}>
      Reset
    </button>
  </section>
)
TextArea.propTypes = {
  result: PropTypes.string.isRequired,
  Class: PropTypes.string.isRequired,
  Type: PropTypes.string.isRequired
}
TextArea.defaultProps = {
  result: '',
}
export default TextArea