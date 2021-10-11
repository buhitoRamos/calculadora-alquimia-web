import React from 'react'
import "./textArea.css"
import PropTypes from 'prop-types'


const TextArea = ({ result, calculate, clear, Class, Type }) => (
  <section>
    <div className="text-center text-white bg-danger">
      <p>{Type}</p>
    </div>
    <textarea className={Class} defaultValue={result} />
    <button type="button"
      className="btn btn-secondary w-100"
      onClick={() => calculate()}>
      Calcular
    </button>
    <button type="button"
      className="btn btn-danger mt-1 w-100"
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