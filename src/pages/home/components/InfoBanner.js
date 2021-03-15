import React from "react";

export const InfoBanner = () => {
  return (
    <div className="container-banner">
      <div className="banner-card">
        <div className="banner-header" id="destino">
        </div>
        <div className="banner-body">
          <h3>Elije tu destino</h3>
          <p>Infinitas posibilidades de volar al lugar<br/> del mundo que elijas.
              Tu destino te está esperando.</p>
        </div>
      </div>
      <div className="banner-card">
        <div className="banner-header" id="calendario"></div>
        <div className="banner-body">
          <h3>Escoge las fechas de tu vuelo</h3>
          <p>Cancelar o modificar tu viaje sin tener <br/>que pagar penalizaciones.</p>
        </div>
      </div>
      <div className="banner-card">
        <div className="banner-header" id="pagos"></div>
        <div className="banner-body">
          <h3>Pago seguro</h3>
          <p>Sistema para realizar los pagos <br/>de tus vuelos de forma segura y rápida. </p>
        </div>
      </div>
    </div>
  );
};
