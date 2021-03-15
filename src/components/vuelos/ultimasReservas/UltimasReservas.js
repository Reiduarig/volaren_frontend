import React, { useState, useEffect,useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getHistorico } from '../../../helpers/Http';
import './UltimasReservas.css';

export const UltimasReservas = () => {

  
  const [uReservas, setUreservas] = useState([]);


   useEffect(() => { 

   /* getHistorico(id).then(respuesta => {
        
        if(!respuesta.data.ok){
          
            setUreservas([]);
        }
        else{
          
            setUreservas(respuesta.data.data);
        }

    });*/

},[]);


    return (
        <div id="ultimasReservas">
            <h4>Últimas reservas</h4>
            <hr/>
            {uReservas.length == 0 && <span>No hay reservas abiertas</span>}
            {uReservas.length > 0 && 
            <table>
                <thead>
                <tr><th>Origen</th><th>Destino</th><th>Salida</th><th>Fecha Fact.</th><th>Estado</th><th></th></tr>
                </thead>
                <tbody>
                {uReservas.map(reserva => (
                    <tr key={reserva.id}><td>{reserva.origen}</td><td>{reserva.destino}</td><td>{reserva.formato_fecha}</td><td>{reserva.formato_fecha_reserva}</td><td>{reserva.estado}</td><td><Link to={{
                        pathname:`/dashboard/historico/reserva`,
                        reserva: reserva.id
                       
                    }} ><i className="fas fa-info"></i></Link></td></tr>
                )) }
                </tbody>
             </table> 
}  
      </div>
    )
}
