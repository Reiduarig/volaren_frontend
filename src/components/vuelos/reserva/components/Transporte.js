import React from 'react'
import { Radio } from 'antd';

export const Transporte = ({reserva, setReserva}) => {

    const onChange = e => {
    
      setReserva({
          ...reserva,
          transporte: e.target.value});
    };

  
 
    return (
        <div id="reserva-extras">
            <div id="container-transporte">
                <div id="transporte-card">
                    <div id="transporte-header">
                        <h3>Alquiler de shuttle</h3>
                        <hr/>
                    </div>
                
                    <Radio.Group onChange={onChange} value={reserva.transporte}>
                    <div id="transporte-body">
                   
                        <div id="transporte-left">
                        <div id="transporte-img"></div>
                            <h4>Estoy bien ¡Gracias!</h4>
                            <div>0€ / Persona</div>
                            <Radio value={0}></Radio>
                        </div>
                        <div id="transporte-center">
                        <div id="transporte-img1"></div>
                            <h4>Del aeropuerto a tu destino</h4>
                            <div>10€ / Persona</div>
                            <Radio value={10}></Radio>
                        </div>
                        <div id="transporte-right">
                        <div id="transporte-img2"></div>
                            <h4>Recorrido de ida y vuelta</h4>
                            <div>20€ / Persona</div>
                            <Radio value={20}></Radio>
                        </div>
                  
                    </div>
                    </Radio.Group>
                </div>
            </div>
        </div>    
    )
}
