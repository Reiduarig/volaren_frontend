import { faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Pasajeros = ({reserva, setReserva}) => {

 
   const {datos_pasajeros, n_personas} = reserva;

  

    return (
        <div className="pasajeroContainer">
              <div className="info-pasajero">
                <div className="header-pasajero">
                  <FontAwesomeIcon icon={faSuitcase}/>
                  <h4>Datos de Pasajeros</h4>
                </div>
                <div className="form-body">
                    <label htmlFor="name">
                        <p>Nombre *</p> 
                        <input
                          type="text"
                          name="nombre"
                          value={datos_pasajeros.nombre}
                          placeholder="ej.María"
                          onChange={(e) => setReserva({
                            ...reserva,
                              datos_pasajeros:{
                                ...datos_pasajeros,
                              nombre: e.target.value
                              }
                          })}
                        
                        />
                      </label> 
                      <label htmlFor="apellido1">
                        <p>1er Apellido *</p>
                        <input
                          type="text"
                          name="apellido1"
                          value={datos_pasajeros.apellido1}
                          placeholder="ej.Pérez"
                          onChange={(e) => setReserva({
                              ...reserva,
                              datos_pasajeros:{
                                ...datos_pasajeros,
                              apellido1: e.target.value
                              }
                          })}
                        
                        />
                      </label>    
                      <label htmlFor="apellido2">
                        <p>2º Apellido *</p>
                        <input
                          type="text"
                          name="apellido2"
                          value={datos_pasajeros.apellido2}
                          placeholder="ej.Pérez"
                          onChange={(e) => setReserva({
                            ...reserva,
                            datos_pasajeros:{
                              ...datos_pasajeros,
                            apellido2: e.target.value
                            }
                        })}
                        />
                      </label>
                      <label htmlFor="dni">
                          <p>Dni *</p>
                        <input
                          type="text"
                          name="dni"
                          value={datos_pasajeros.dni}
                          placeholder="12345678A"
                          onChange={(e) => setReserva({
                            ...reserva,
                            datos_pasajeros:{
                              ...datos_pasajeros,
                            dni: e.target.value
                            }
                        })}
                          required
                        />
                        </label>
                    
                    </div>
                    {n_personas > 1 &&
                      <div className="form-body">
                      
                        <label htmlFor="name"><p>Nombre *</p>
                        <input
                          type="text"
                          name="2nombre"
                          value={datos_pasajeros.nombre}
                          placeholder="ej.María"
                          onChange={(e) => setReserva({
                            ...reserva,
                              datos_pasajeros:{
                                ...datos_pasajeros,
                              nombre: e.target.value
                              }
                          })}
                          required
                        />
                        </label>
                       
                        <label htmlFor="apellido1">
                          <p>1er Apellido *</p>
                        <input
                          type="text"
                          name="2apellido1"
                          value={datos_pasajeros.apellido1}
                          placeholder="ej.Pérez"
                          onChange={(e) => setReserva({
                              ...reserva,
                              datos_pasajeros:{
                                ...datos_pasajeros,
                              apellido1: e.target.value
                              }
                          })}
                          required
                        />
                        </label>
                        
                        
                        <label htmlFor="apellido2">
                          <p>2º Apellido *</p>
                        <input
                          type="text"
                          name="2apellido2"
                          value={datos_pasajeros.apellido2}
                          placeholder="ej.Pérez"
                          onChange={(e) => setReserva({
                            ...reserva,
                            datos_pasajeros:{
                              ...datos_pasajeros,
                            apellido2: e.target.value
                            }
                        })}
                          required
                        />
                        </label>
                        
                       
                        <label htmlFor="dni2">
                          <p>Dni *</p>
                        <input
                          type="text"
                          name="dni"
                          value={datos_pasajeros.apellido2}
                          placeholder="ej.Pérez"
                          onChange={(e) => setReserva({
                            ...reserva,
                            datos_pasajeros:{
                              ...datos_pasajeros,
                            apellido2: e.target.value
                            }
                        })}
                          required
                        />
                        </label>
                      </div>
                    }
                 </div>   
            </div>

    )
}
