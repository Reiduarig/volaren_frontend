import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLuggageCart, faUserAlt } from "@fortawesome/free-solid-svg-icons";
export const InfoVuelo = ({ reserva }) => {
  const { n_maletas, n_personas, precio_total, tarifa } = reserva;

  return (
    <div className="carro-vuelo">
      <div className="section">
        <h3>Precio Vuelo {precio_total} €</h3>
        <p>* Impuestos y gastos de gestión incluidos</p>
      </div>
      <div className="section">
        <h4>Pasajeros</h4>
        <p>
          {n_personas} <FontAwesomeIcon icon={faUserAlt}/>
        </p>
      </div>
      <div className="section">
        <h4>Maletas facturadas</h4>
        <p>
          {n_maletas} <FontAwesomeIcon icon={faLuggageCart}/>
        </p>
      </div>
      <div className="section">
        <h4>Clase</h4>
        <p style={{textTransform:"capitalize"}}>
          {tarifa}
        </p>
      </div>
    </div>
  );
};
