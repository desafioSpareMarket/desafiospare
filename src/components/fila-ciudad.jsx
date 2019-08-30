import React from 'react';
import Ciudad from './../class/Ciudad.js';

class CiudadFila extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nombre: '', hora:'', clima:'', temperatura:''};
  }
  
  UNSAFE_componentWillMount() {
   
    var Request = require("request");
    var latitud = this.props.latitud;
    var longitud = this.props.longitud;
    //invocamos el servicio.
    try{
                
          Request.get("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/8adea53823786001b2399ae438d40bf1/"+latitud+","+longitud+"?lang=es&units=si&exclude=minutely,hourly,daily,alerts,flags",
          (error, response, body) => {
              if(error) {
                  return console.dir(error);
              }
              else
              {
                  
                  var jsonContent = JSON.parse(body);
                  this.setState({ nombre: this.props.nombre });
                  this.setState({ hora: this.convierteTiempo(jsonContent.currently.time, jsonContent.offset) });
                  this.setState({ clima: jsonContent.currently.summary });
                  this.setState({ temperatura: Math.round(jsonContent.currently.temperature*10)/10});
              }
          });
        
    }
    catch
    {
        throw new Error('How unfortunate! The API Request Really Failed.');
    }
}

    
  render() {
    if (this.state.clima.length > 0) {
      return (
          <li className="media">
            <div className="media-body">
              <h4>En este momento en {this.state.nombre}</h4>
              <h3>son las {this.state.hora}</h3>
              <h2>El clima esta {this.state.clima}</h2>
              <h1>con una temperatura de {this.state.temperatura}&#176;</h1>
            </div>
            
          </li>
      )
    } else {
      return <p className="text-center">Cargando datos...</p>
    }
  }

  convierteTiempo(timestamp, offset)
{
    /*se convierte el timestamp en la hora relativa a la ubicacion consultada */
    var date = new Date(timestamp*1000);
    var targetTime = new Date(date);
    var tzDifference = offset * 60 + targetTime.getTimezoneOffset();
    var offsetTime = new Date(targetTime.getTime() + tzDifference * 60 * 1000);
    var hours = offsetTime.getHours();
    var minutes = "0" + offsetTime.getMinutes();
    var seconds = "0" + offsetTime.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    console.log(formattedTime);
    return formattedTime;
}
 errorForzado()
{
     if (Math.random(0, 1) < 0.1) {
        throw new Error('How unfortunate! The API Request Failed.');
    }
      
}

}
export default CiudadFila