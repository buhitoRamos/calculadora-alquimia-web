import React from 'react'
import "./textArea.css"


const TextArea = ({result}) => (
<section>
<textarea className="text-area" value={result.value}/>
</section>
)
export default TextArea