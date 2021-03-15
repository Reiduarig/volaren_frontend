import { CheckCircleOutlined, CheckOutlined } from '@ant-design/icons';
import React from 'react'
import  Switch  from '../../../../components/switch/Switch';

export const SeguroEquipaje = ({ reserva, setReserva}) => {

  const {seguro_viaje, precio_total} = reserva;

  const handleChange = (nuevoValor) => {

    let total = precio_total;
    if(nuevoValor){
      total += 9;
    }else{
      total -= 9;
    }
    setReserva({
      ...reserva,
      seguro_viaje: nuevoValor,
      precio_total: total
    })
  }
 
    return (
        <div className="equipaje-extraviado">
          <div className="info-servicio">
            <h3>Seguro de cancelación y asistencia médica</h3>
            <div className="servicio-options">
              <p><CheckOutlined style={{ fontSize: '17px', color: 'lightgreen',marginRight: '5px' }}/>
                Rastrea tu equipaje retrasado y recíbelo en un plazo de 96
                horas
              </p>
              <p><CheckOutlined style={{ fontSize: '17px', color: 'lightgreen',marginRight: '5px'  }}/>
                Recibirás 500 € por cada pieza de equipaje que no llegue en 96
                horas
              </p>
              <p><CheckOutlined style={{ fontSize: '17px', color: 'lightgreen',marginRight: '5px'  }}/>
                Recibe actualizaciones por correo electrónico y SMS en tiempo
                real sobre el estado de tu equipaje retrasado
              </p>
            </div>
          </div>
          <div className="maleta-anadir">
            <label htmlFor="servicio_equipaje">
              Añadir servicio
              <Switch  value={seguro_viaje} setValue={nuevoValor => handleChange(nuevoValor)} />
            </label>
            <span>9 €/trayecto </span>
          </div>
        </div>
    )
}
