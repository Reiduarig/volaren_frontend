import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export const CreditCard = ({datos}) => {
  
  
    return (
      <div id="PaymentForm">
        <Cards
          cvc={datos.codigo_seguridad}
          expiry={datos.fecha_caducidad} 
          name={datos.nombre + " " + datos.apellido1}
          number={datos.numero_tarjeta}
        />
      </div>
    );
  }
