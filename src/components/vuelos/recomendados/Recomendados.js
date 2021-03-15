import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Recomendados.css";

export const Recomendados = () => {

  const [origen] = useState('vigo');
  const [destino] = useState('londres');
  const [fecha_salida] = useState('2021-04-30');
  const [fecha_vuelta] = useState('2021-05-03');
  const [directo] = useState(true);
  const [idavuelta] = useState(false);
  const [precio] = useState(1000);
  const [n_personas] = useState(1);
  const [clase] = useState('turista')
  

  return (
    <div id="recomenContainer">
      <h1>Destinos Recomendados</h1>
      <hr />
      <div id="pruebaAnimacion"></div>
      <div id="recomendList">
        <div className="recomendCard">
        <NavLink to={{ 
            pathname: `/listaVuelos`,
            state: {origen: "vigo", destino:"barcelona", fecha_salida:"2021-03-28", fecha_vuelta:"2021-04-30", directo: true, idavuelta: false, precio: 1000, clase: 'turista', n_personas:1}}}> 
          <div id="bar"></div></NavLink>     
        </div>
        <div className="recomendCard">
        <NavLink to={{ 
            pathname: `/listaVuelos`,
            state: {origen:"vigo", destino:"paris", fecha_salida:"2021-03-01", idavuelta: false, directo: true, precio: 1000, clase:'turista', n_personas:1}}}> <div id="par"></div></NavLink>
        </div>
        <div className="recomendCard">
          <NavLink to={{ 
            pathname: `/listaVuelos`,
            state: {origen, destino, fecha_salida, fecha_vuelta, directo, idavuelta, precio, clase, n_personas}}}>
            <div id="lon"></div></NavLink>
        </div>
      </div>
    </div>
  );
};
