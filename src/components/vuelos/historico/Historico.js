import { faBan, faFileContract, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getHistorico } from '../../../helpers/Http';
import { finishLoading, removeError, setError, startLoading } from '../../../reducers/uiReducer';

import './Historico.css';

export const Historico = () => {
    
    const user = useSelector(s=>s.auth);
  

    const estado = useSelector(s => s.ui);
    const { msgError } = estado;
    const dispatch =  useDispatch();

    const [listaVuelos, setListaVuelos] = useState([]);

    useEffect(() => {
       
        getHistorico(user.id).then(respuesta => {
            dispatch( removeError() );                
            dispatch( startLoading() );

            if(respuesta.ok){
                dispatch( finishLoading() );
                dispatch( removeError() );
                setListaVuelos(respuesta.data);
            }
            else{
                dispatch( finishLoading() );
                dispatch( setError(respuesta.message) );
                
            }
        });

    },[setListaVuelos])

    return (
        
        <div id="historicoVuelos">
            <div className="bannerHistorico">
                <h1>Mis reservas</h1>
            </div>
            <div id="container-historicos">
            
                {listaVuelos && listaVuelos.map((vuelo) =>( 
                    
                        <div key={vuelo.id} className={`${vuelo.estado === 'confirmada' ? "cardReservaConfirmada" : "cardReservaCancelada" }`}>
                            <div>{vuelo.estado==='confirmada' ? (
                                <img width="100" height="35" src={`http://localhost:3999/api/vuelos/image/${vuelo.imagen}`} alt={vuelo.nombre} />
                                    ) : (
                                        <FontAwesomeIcon icon = {faBan} size="2x" color="navy"/>
                                    )
                            }
                            </div>
                            <div><strong>{vuelo.origen}</strong></div>
                            <div><strong>{vuelo.destino}</strong></div>
                            <div>{vuelo.formato_fecha_reserva}</div>
                            <div style={{textTransform:"capitalize"}} className={`${vuelo.estado === 'confirmada' ? "cardReservaEstado" : "" }`}><strong>{vuelo.estado}</strong></div>
                            <div><Link to={`/dashboard/historico/documents/${vuelo.id}`} ><FontAwesomeIcon icon={faFileContract} size="2x" color="navy"/></Link></div>
                            <div><Link to={`/dashboard/historico/reserva/${vuelo.id}`} ><FontAwesomeIcon icon={faInfoCircle} size="2x" color="navy"/></Link></div>
                        </div>
                   
                ))}
                
                {!listaVuelos.length && <span className="errorMessages">Todavía no hay reservas</span>}
            </div>
           
        </div>
        
    )
}
