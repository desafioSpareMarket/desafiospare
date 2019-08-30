import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import CiudadListado from './components/lista-ciudad.jsx';
import Ciudad from './class/Ciudad.js';

grabaRedis(); /* se levantan los datos en redis*/

  
  
  function grabaRedis()
  {
    /*
    abrir conexion

    HMSET ciudad:1 ciudad "SANTIAGO (CL)" latitud "-33.4372" longitud "-70.6506"
    HMSET ciudad:1 ciudad "ZURICH (CH)" latitud "47.3666700" longitud "8.5500000"
    HMSET ciudad:1 ciudad "AUCKLAND (NZ)" latitud "-36.8404" longitud "174.74"
    HMSET ciudad:1 ciudad "SYDNEY (AU)" latitud "-33.8667" longitud "151.2"
    HMSET ciudad:1 ciudad "LONDRES (UK)" latitud "51.5072" longitud "-0.1275"
    HMSET ciudad:1 ciudad "GEORGIA (US)" latitud "33.7490005" longitud "-84.3879776"
    */

   despliegaInfo(); //llamada inicial
  }

  function despliegaInfo() 
  {
    let ciudades = [
        { id: 1, ciudad: "SANTIAGO (CL)", latitud: -33.4372, longitud: -70.6506 },
        { id: 2, ciudad: "ZURICH (CH)", latitud: 47.3666700, longitud: 8.5500000 },
        { id: 3, ciudad: "AUCKLAND (NZ)", latitud: -36.8404, longitud: 174.74 },
        { id: 4, ciudad: "SYDNEY (AU)", latitud: -33.8667, longitud: 151.2 },
        { id: 5, ciudad: "LONDRES (UK)", latitud: 51.5072, longitud: -0.1275 },
        { id: 6, ciudad: "GEORGIA (US)", latitud: 33.7490005, longitud: -84.3879776 }
      ]
    ReactDOM.render(<CiudadListado listado={ ciudades } />, document.getElementById('application'));
  }

  function handleResponseError(response) 
  {
    throw new Error("HTTP error, status = " + response.status);
  }
  function refresca()
  {
    grabaRedis();
  }
  setInterval(despliegaInfo(), 10000);

serviceWorker.unregister();
