import React,{ useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "./Card";
import { useFetch } from 'ruse-fetch'
import './ListaVuelos.css';
import { NavLink, useLocation } from "react-router-dom";
import { ListaFiltro } from "./ListaFiltro";

const { REACT_APP_API_URL } = process.env;

export const ListaVuelos = () => {

  const estado = useSelector(state => state.ui);
  const { msgError} = estado;

  let parametros = useLocation().state;
 
  const [filtro, setFiltro] = useState('precio')
  
  const handleFiltroDuration = async() => {
    setFiltro('duracion');
  
  }
  const handleFiltroPrecio = async() => {
    setFiltro('precio');
  
  }
  const handleFiltroDirecto = async() => {
    setFiltro('escalas');
  }
  const handleFiltroIda = async() => {
    setFiltro('vuelta');
  }

  let cuerpo = JSON.stringify({...parametros, filtro});

   const vuelos = useFetch(`${REACT_APP_API_URL}vuelos`,{
      headers: {"Content-Type":"application/json"},
      body: cuerpo,
      method: 'POST'
    },cuerpo).data


  return (
    <div id="container-listaVuelos">
      <div id="listaVuelos">
        
          <ListaFiltro cuerpo={cuerpo} parametros = {parametros} />
       
        
        <div id="formFiltro">
          <button onClick={handleFiltroDirecto}>Sin escalas</button>
          <button onClick={handleFiltroDuration}>Más corto</button>
          <button onClick={handleFiltroPrecio}>Más barato</button>
          <button onClick={handleFiltroIda}>Sólo ida</button>
        </div>  
        {!vuelos && <span className="errorMessages">No se han encontrado vuelos para las fechas seleccionadas</span>}
          {msgError && <span className="errorMess">{msgError}</span>}
          {vuelos && 
            vuelos.map((vuelo) => (
              <Card key={ vuelo.id } vuelo={ vuelo } />
            ))
          }
      </div>    
      <div id="banner-listaVuelos">
        <NavLink to={{
          pathname:`/listaVuelos`,
          state: {origen:"vigo", destino:"paris", fecha_salida:"2021-03-02", precio:1000, n_personas:1, idavuelta:false}
          }}> 
          <div className="banner1"></div></NavLink>
          <NavLink to={{
          pathname:`/listaVuelos`,
          state: {origen:'vigo', destino:"madrid", fecha_salida:"2021-03-02", directo:'s', idavuelta:"s", precio:1000}
          }}> <div className="banner2"></div></NavLink>
        <NavLink to={{
          pathname:`/listaVuelos`,
          state: {origen:"vigo", destino:"Nueva York", fecha_salida:"2021-03-27", fecha_vuelta:"2021-04-15", precio:1000, idavuelta: true, precio:1000}
          }}> <div className="banner3"></div></NavLink>
      </div>
    </div>
  )    
};
