import React from "react";
import info from '../../../assets/images/covid-info.png';

export const InfoCovid = () => {
  return (
    <div className="info">
      <div id="infoText">
        <h2>
          <i className="fas fa-info-circle"></i> Información adicional COVID-19
        </h2>
        <h3>
          Para los desplazamientos en transporte público en España (incluido el
          avión), es obligado el uso de mascarillas que cubran nariz y boca,
          durante todas las fases del vuelo. Los pasajeros provenientes de zonas
          consideradas de riesgo deberán aportar una PCR negativa realizada un
          máximo de 72 horas antes de su llegada. Más información y acceso al
          formulario sanitario aqui:{" "}
          <a href="www.spth.gob.es">www.spth.gob.es.</a>
        </h3>
      </div>
      <img src={info} alt="info-covid" />
    </div>
  );
};
