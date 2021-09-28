import React from 'react'




  const _renderAroms = (aroms, handleChange) => {
    return (
      aroms.map(aroma =>

        <div className="input-group mb-3" id={aroma.index}>
          <input className="input-group-text" id="label"
            placeholder="aroma" defaultValue={aroma.name} onChange={(ev) => handleChange(aroma, ev)} />
          <input type="text" className="form-control"
            placeholder="ingrese porcentaje" aria-label="input"
            aria-describedby="ingreso de aroma"
            defaultValue={aroma.value}
            onChange={(ev) => handleChange(aroma, ev)} />
        </div>
      )
    )
  }


  const Aroms = ({aroms, handleChange}) => (
    <section className="overFlow">
      {
        _renderAroms(aroms, handleChange)
      }
    </section>
  )

export default Aroms;