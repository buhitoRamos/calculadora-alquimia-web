import React from 'react'
import "./textArea.css"
import PropTypes from 'prop-types'


const TextArea = ({result}) => (
<section>
<textarea className="text-area" defaultValue={result}/>
</section>
)
TextArea.propTypes = {
    result: PropTypes.string.isRequired,
  }
  TextArea.defaultProps = {
    result: '',
  }
export default TextArea