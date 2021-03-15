import { faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Moment from 'react-moment';

export const InfoCabecera = ({vuelo}) => {
    return (
        <div className="infoCabecera">
              <div id="infoCabecera-header">
                  <img src={`http://localhost:3999/api/vuelos/image/${vuelo.imagen}`} alt={vuelo.nombre} />
                  <span>Número de vuelo: {vuelo.aerolinea_id}{vuelo.id}</span> 
              </div>     
              <div id="infoCabecera-body">
                  <div id="infoCab-left">
                      <div id="infoCab-left-header">
                        {vuelo.hora_salida &&
                        <span>{vuelo.hora_salida.substring(0, 5)} {vuelo.aeropuerto_origen}</span>
                        }
                      </div>
                      <div id="infoCab-left-body">
                        <Moment format="ddd,LL">{vuelo.fecha_salida}</Moment>
                        <span>Aeropuerto {vuelo.n_aerop_origen}</span>
                      </div>
                  </div>
                  <div id="infoCab-center">
                      {vuelo.escalas === 0 ? (
                        <span>Sin escalas</span>
                      ) : (
                        <p>{vuelo.escalas} escala</p>
                      )}
                      <div id="lineBox"><FontAwesomeIcon icon={faDotCircle} /><div id="lineBox-line"></div><FontAwesomeIcon icon={faCircle}/></div>
                      <span>{vuelo.duracion} horas</span>

                  </div>
                  <div id="infoCab-right">
                    <div id="infoCab-right-header">
                    {vuelo.hora_llegada &&
                      <span>{vuelo.hora_llegada.substring(0, 5)} {vuelo.aeropuerto_destino}</span>
                    }
                    </div>
                    <div id="infoCab-right-body">
                      <Moment format="ddd,LL">{vuelo.fecha_salida}</Moment>
                      <span>Aeropuerto {vuelo.n_aerop_destino}</span>
                    </div>
                  </div>
                  </div>
                  {vuelo.vuelta === "s" && 
               
                    <div id="infoCabecera-body2">
                      <div id="infoCab-left">
                        <div id="infoCab-left-header">
                          {vuelo.hora_salida &&
                          <span>{vuelo.hora_salida.substring(0, 5)} {vuelo.aeropuerto_destino}</span>
                          }
                        </div>
                        <div id="infoCab-left-body">
                          <Moment format="ddd,LL">{vuelo.fecha_vuelta}</Moment>
                          <span>Aeropuerto {vuelo.n_aerop_destino}</span>
                        </div>
                      </div>
                      <div id="infoCab-center">
                          {vuelo.escalas === 0 ? (
                            <span>Sin escalas</span>
                          ) : (
                            <p>{vuelo.escalas} escala</p>
                          )}
                          <div id="lineBox"><FontAwesomeIcon icon={faDotCircle} /><div id="lineBox-line"></div><FontAwesomeIcon icon={faCircle}/></div>
                          <span>{vuelo.duracion} horas</span>
                      </div>
                      <div id="infoCab-right">
                        <div id="infoCab-right-header">
                        {vuelo.hora_llegada &&
                          <span>{vuelo.hora_llegada.substring(0, 5)} {vuelo.aeropuerto_origen}</span>
                        }
                        </div>
                        <div id="infoCab-right-body">
                          <Moment format="ddd,LL">{vuelo.fecha_vuelta}</Moment>
                          <span>Aeropuerto {vuelo.n_aerop_origen}</span>
                        </div>
                      </div>
                      </div>
                    
                  }
              
              <div id="infoCabecera-footer">
                  <p>Sólo quedan 7 billetes</p>
              </div>   
          </div>
    )
}
