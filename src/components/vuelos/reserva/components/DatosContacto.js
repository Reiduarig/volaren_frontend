import React from 'react'

export const DatosContacto = ({reserva, setReserva}) => {

    const {datos_contacto} = reserva;

    
    return (
        <div className="contacto-pasajero">
              <div id="header-contacto">
                <i className="fas fa-user"></i>
                <h4> Datos de contacto</h4>
              </div>
              <div id="contacto-form-body">
                <label htmlFor="email">
                    <p>Email *</p>
                    <input
                        type="email"
                        name="email"
                        placeholder="ejemplo@email.com"
                        value={datos_contacto.contacto_email}
                        onChange={(e) => setReserva({
                            ...reserva,
                            datos_contacto:{
                                ...datos_contacto,
                                contacto_email: e.target.value
                            }
                            
                        })}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                     
                    />
                </label>
                <label htmlFor="telefono">
                    <p>Teléfono *</p>
                <input
                    type="text"
                    name="telefono"
                    placeholder="Número de teléfono"
                    value={datos_contacto.contacto_telefono}
                    onChange={(e) => setReserva({
                        ...reserva,
                        datos_contacto:{
                            ...datos_contacto,
                            contacto_telefono: e.target.value
                        }
                        
                    })}
              
                />
                </label>
              </div>   
        </div>
    )
}
