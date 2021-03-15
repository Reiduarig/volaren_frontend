import React from 'react';
import {Spinner} from '../../../spinner/Spinner';


export const FactEquipaje = ({ reserva, setReserva }) => {

 const { n_maletas, precio_total } = reserva;
 
 
 const handleOnChange = (nuevoValor) =>{
   
    let total = precio_total;
    let prevCantidad = n_maletas;

    if(nuevoValor > prevCantidad){
      total +=  39;
    }else if(nuevoValor < prevCantidad){
      total -=  39;
    }
   
    setReserva({
      ...reserva,
      n_maletas: nuevoValor,
      precio_total: total    
    })  
 }
 
    return (
        <div className="pasajero-facturacion">
          <div className="equipaje-facturado">
            <h3>Facturación de maletas</h3>
            <h4>Añade ahora tu maleta y no en el aeropuerto ahorrándote{" "}<strong>¡Hasta un 50%!</strong></h4>
            <div className="maleta-anadir">
              <div className="imagen-maleta"></div>
              <div className="maleta-tarifa">
                <div id="info-tarifa">
                  <span>{n_maletas} x 23Kg</span>
                </div>
                <span>39€ por maleta y trayecto</span>
                <div id="spinner-tarifa">
                  <Spinner name="n_maletas" value={n_maletas} setValue={nuevoValor => handleOnChange(nuevoValor)}  min={0} max={3}/>
                </div>    
              </div>
              <div className="banner-factEq"></div>
            </div>
          </div>
        </div>
    )
}
