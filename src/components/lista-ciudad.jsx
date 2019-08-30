import React from 'react';
import CiudadFila from './fila-ciudad.jsx';

class CiudadListado extends React.Component {
  render() {
    return (
      <ul className="media-list">
        {
          this.props.listado.map((ciudad,index) => {
            return <CiudadFila key={ciudad.id} 
                               nombre={ciudad.ciudad}
                               latitud={ciudad.latitud}
                               longitud = {ciudad.longitud}
                               />
          })
        }
      </ul>
    )
  }
}

export default CiudadListado