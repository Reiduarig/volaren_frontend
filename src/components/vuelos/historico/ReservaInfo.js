import React, { useState, useEffect } from 'react'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getReservaById, cancelarReserva } from '../../../helpers/Http';
import { finishLoading, removeError, setError, startLoading } from '../../../reducers/uiReducer';
import './ReservaInfo.css';

export const ReservaInfo = () => {

    const estado = useSelector(s => s.ui);
    const dispatch = useDispatch();
    const { msgError } = estado;
    const {id} = useParams();
    const [access, setAccess] = useState(false);
    const [infoReserva, setInfoReserva] = useState({})

    useEffect(() => {
        
        getReservaById(id).then(res => {

            if(res.ok){
             
                setInfoReserva(
                    res.data[0]
                )
            }else{
                setInfoReserva({})
            }
        },
        error => {
            console.log(error);
        })
      

    }, [setInfoReserva])

    const deleteReserva = async() => {

        try{
            
        
            cancelarReserva(infoReserva.reserva_id).then(response => {
                dispatch(startLoading());
                if(response.ok){
                    setInfoReserva({
                        ...infoReserva,
                        estado: 'cancelada'
                    })
                    dispatch(finishLoading());
                    dispatch(removeError());
                    setAccess(true)
                }else{
                    setAccess(false);
                    dispatch(finishLoading())
                    dispatch(setError(response.message))
                }
            })

    }catch(e){
        dispatch(finishLoading());
        console.log(e)
    }finally{
        dispatch(finishLoading())
    }
    }

    if(access){
         Swal.fire({
            title: 'Reserva cancelada',
            text: 'Su reserva ha sido cancelada correctamente',
            icon: 'success',
        })

        return <Redirect to="/dashboard"></Redirect>
      
    }
    
    return (
        <div id="container-reservaInfo">
            <div id="reservaInfoCard">
                <h2>Tu reserva a {infoReserva.destino} el <Moment format="LL">{infoReserva.fecha_salida}</Moment></h2>
                <div id="resinfoCardHeader">
                    <div id="resinfoProfileImage">
                        <img width="180" height="40" src={`http://localhost:3999/api/vuelos/image/${infoReserva.imagen}`}/>
                    </div>
                    <div id="resinfoHeader">
                        <h4>Datos pasajero/s</h4>
                        <p>{infoReserva.nombre} {infoReserva.apellido1} {infoReserva.apellido2}</p>
                    </div>
                    <div id="resinfoIdentidad">
                        <h4>Documento de Identidad</h4>
                        <p>{infoReserva.dni}</p>
                    </div>
                    <div id="resinfoNreserva">
                        <h4>Número de reserva</h4>
                        <p>{infoReserva.aerolinea_id}{infoReserva.reserva_id}</p>
                    </div>
                    <div id="idtablainfoReserva">
                        <h4>Datos de los vuelos</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Origen</th>
                                    <th>Destino</th>
                                    <th>Vuelo</th>
                                    <th>Salida</th>
                                    <th>Llegada</th>
                                    <th>Seguro</th>
                                    <th>Clase</th>
                                    <th>Estado</th>
                                </tr>
                                </thead>
                            <tbody>
                                <tr>
                                    <td>{infoReserva.origen}</td>
                                    <td>{infoReserva.destino}</td>
                                    <td>{infoReserva.aerolinea_id}{infoReserva.vuelo_id}</td>
                                    { infoReserva.hora_salida &&
                                    <td>{infoReserva.hora_salida.substring(0,5)}</td>
                                    }
                                    { infoReserva.hora_llegada &&
                                    <td>{infoReserva.hora_llegada.substring(0,5)}</td>
                                    }
                                    {infoReserva.seguro_viaje ? (<td>Sí</td>) : (<td>No</td>)}
                                    <td style={{textTransform:"capitalize"}}>{infoReserva.clase}</td>
                                    <td style={{textTransform:"capitalize"}}>{infoReserva.estado}</td>
                                </tr>
                            </tbody>    
                        </table>
                    </div>
                </div>
                <div id="resinfoCardBody">
                    <div id="resinfoDatosContacto">
                            <h4>Datos de contacto</h4>
                            <p>Email: {infoReserva.contacto_email}</p>
                            <p>Telefono: {infoReserva.contacto_telefono}</p>
                        </div>    
                    </div>
            </div>
            <div className="btn-info">
                <Link id="btn-return-info" to="/dashboard">Volver</Link>
                {infoReserva.estado === 'confirmada' &&
                    <button onClick={deleteReserva}>Pedir cancelación</button>
                }
            {msgError && <span className="errorMessages">{msgError}</span>}
            </div>
        </div>
    )
}
