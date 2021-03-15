import React, {  useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import { getUserAllById, postPago } from "../../../helpers/Http";
import master from '../../../assets/images/mastercard.jpg';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError, startLoading, finishLoading } from "../../../reducers/uiReducer";
import logo_volaren from '../../../assets/logos/logoVolaren.png';
import Cards from 'react-credit-cards';
import  Switch from "../../switch/Switch";
import 'react-credit-cards/es/styles-compiled.css';

export const VueloPasarela = ({reserva, datos_facturacion, setDatosFacturacion}) => {
  
  const valid={
    valid: 'Caduca'
  }
  const user = useSelector(s => s.auth)
  const estado = useSelector((state) => state.ui);
  //const { msgError } = estado;
  const dispatch = useDispatch();
  const { vuelo_id, n_maletas, n_personas, precio_total, transporte, datos_contacto, datos_pasajeros, seguro_viaje, tarifa } = reserva;
  const [completo, setCompleto] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const [focus, setFocus] = useState('')
  const [datosFactAlt, setdatosFactAlt] = useState({
    nombreAlt: "",
    apellido1Alt: "",
    apellido2Alt: "",
    dniAlt: "",
    telefonoAlt: "",
    direccionAlt: "",
    ciudadAlt: "",
    cod_postalAlt: "",
    provinciaAlt: "",
    paisAlt: "",
    fecha_caducidadAlt: "",
    numero_tarjetaAlt: "",
    cod_seguridadAlt: "",
 
  });
  const [usaDatos, setUsaDatos] = useState(false);
  
  const getDatos = async () => {

    if(user){

      let respuesta = await getUserAllById(user.id);

    
    
    if(respuesta.ok){
      setDatosFacturacion(respuesta.data[0])
    }else{
      setDatosFacturacion([])
    }
  }
  };

  const realizarPago = async(e) => {

    e.preventDefault();
    
    dispatch(startLoading());
    await postPago(user.id, vuelo_id, n_personas, n_maletas, precio_total, seguro_viaje, transporte, datos_contacto, datos_pasajeros, tarifa)
      .then((response) => {

        if (response.ok && !response.errors) {
          dispatch(finishLoading());
          dispatch(removeError());
          setCompleto(true);
          Swal.fire({
            title:'Comprobando datos de pago',
            text:'Procesando',
            icon:'info',
            showConfirmButton: false,
            footer:'Este proceso puede tardar varios minutos',
            timer: 3000,
            width: '60%', 
            position:'top',
            padding: '1.5rem',
            backdrop: true,
            timerProgressBar: true,
            imageUrl: logo_volaren,
            imageWidth: '200px',
            imageHeight:'200px',
            imageAlt:'logo'
          })
          
        }else if(response.errors){  
          dispatch(finishLoading());
          console.log('Error interno del servidor')
          setCompleto(false);
          console.log(response.errors)
        }else{  
          dispatch(finishLoading());
          dispatch(setError(response.message)); 
          setCompleto(false); 
        }
        
      })
        
  };

  useEffect(() => {
    getDatos();
  }, []);


  const handleInputChange = ({ target }) => {
    setdatosFactAlt({
      ...datosFactAlt,
      [target.name]: target.value,
    });
  };

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  }

  const {
    nombreAlt,
    apellido1Alt,
    apellido2Alt,
    dniAlt,
    telefonoAlt,
    direccionAlt,
    ciudadAlt,
    cod_postalAlt,
    provinciaAlt,
    paisAlt,
    fecha_caducidadAlt,
    numero_tarjetaAlt,
    cod_seguridadAlt,
  } = datosFactAlt;

  if(completo){
    return <Redirect to="/redirectReserva"/>
  }

  return (
    
    <div id="pagoContainer">
     
        
      <div className="res-datosFact">
      {user && datos_facturacion && (
        <>
          <h3>Tus Datos de facturación</h3>
          <div id="lista-datosFact">
            <div id="direccion-fact">
              <p>{datos_facturacion.nombre} {datos_facturacion.apellido1} {datos_facturacion.apellido2}</p>
              <p>{datos_facturacion.dni}</p>
              <p>{datos_facturacion.direccion}</p>
              <div>
                <p>{datos_facturacion.ciudad} ( {datos_facturacion.cod_postal} )</p>
              </div>
              <div><p>{datos_facturacion.provincia}</p></div>
              <div><p>{datos_facturacion.pais}</p></div>
            </div>
            <div id="tipo-fact">
            {/* <CreditCard datos={datos_facturacion} /> */}
              <h4>Método de pago</h4>
              <div className="tipo-item">
                <p>Titular: {datos_facturacion.nombre} {datos_facturacion.apellido1} {datos_facturacion.apellido2}</p>
              </div>
              <div className="tipo-item">
              {datos_facturacion.numero_tarjeta &&
                <p>Nº tarjeta: **** **** **** {datos_facturacion.numero_tarjeta.substring(12,16)}</p>
              }
              </div>
              <img src={master} alt="tarjeta"/>
            </div>
          </div>
          
        
        
       <div className="facturacion-options">
           <p>No quiero utilizar los datos de facturación guardados</p>
           <Switch value={formVisible} setValue={setFormVisible} />
       </div>
       </>
      )}
      {formVisible &&
        <div className="datosFact-Alt">
          <form id="account-form">
            <div className="formUp">
              <label htmlFor="nombreAlt">
                <p className="lbl-txt">Nombre</p>
                <input
                  type="text"
                  name="nombreAlt"
                  onChange={handleInputChange}
                  defaultValue={nombreAlt}
                ></input>
              </label>
              <label htmlFor="apellido1Alt">
                <p className="lbl-txt">1er Apellido</p>
                <input
                  type="text"
                  name="apellido1Alt"
                  onChange={handleInputChange}
                  defaultValue={apellido1Alt}
                ></input>
              </label>
              <label htmlFor="apellido2Alt">
                <p className="lbl-txt">2º Apellido</p>
                <input
                  type="text"
                  name="apellido2Alt"
                  onChange={handleInputChange}
                  defaultValue={apellido2Alt}
                ></input>
              </label>
              <label htmlFor="dniAlt">
                <p className="lbl-txt">Dni</p>
                <input
                  type="text"
                  name="dniAlt"
                  onChange={handleInputChange}
                  defaultValue={dniAlt}
                  max="9"
                ></input>
              </label>
              <label htmlFor="direccionAlt">
                <p className="lbl-txt">Dirección</p>
                <input
                  type="text"
                  name="direccionAlt"
                  onChange={handleInputChange}
                  defaultValue={direccionAlt}
                ></input>
              </label>
              <label htmlFor="ciudadAlt">
                <p className="lbl-txt">Ciudad</p>
                <input
                  type="text"
                  name="ciudadAlt"
                  onChange={handleInputChange}
                  defaultValue={ciudadAlt}
                ></input>
              </label>
              <label htmlFor="cod_postalAlt">
                <p className="lbl-txt">Cód.Postal</p>
                <input
                  type="text"
                  name="cod_postalAlt"
                  onChange={handleInputChange}
                  defaultValue={cod_postalAlt}
                ></input>
              </label>
              <label htmlFor="provinciaAlt">
                <p className="lbl-txt">Provincia</p>
                <input
                  type="text"
                  name="provinciaAlt"
                  onChange={handleInputChange}
                  defaultValue={provinciaAlt}
                ></input>
              </label>
              <label htmlFor="paisAlt">
                <p className="lbl-txt">País</p>
                <input
                  type="text"
                  name="paisAlt"
                  onChange={handleInputChange}
                  defaultValue={paisAlt}
                ></input>
              </label>
            </div>
            <div id="paymentForm">
              <div id="paymentFormInputs">
                <label htmlFor="numero_tarjetaAlt">
                  <p className="lbl-txt">Nº tarjeta</p>
                  <input
                    type="text"
                    name="numero_tarjetaAlt"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    defaultValue={numero_tarjetaAlt}
                    maxLength="16"
                    minLength="16"
                  ></input>
                </label>
                <label htmlFor="fecha_caducidadAlt">
                  <p className="lbl-txt">Caducidad</p>
                  <input
                    type="text"
                    name="fecha_caducidadAlt"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    defaultValue={fecha_caducidadAlt}
                    maxLength="4"
                    minLength="3"
                  ></input>
                </label>
                <label htmlFor="cod_seguridadAlt">
                  <p className="lbl-txt">Cód. seguridad</p>
                  <input
                    type="text"
                    name="cod_seguridadAlt"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    defaultValue={cod_seguridadAlt}
                    maxLength="4"
                    minLength="3"
                  ></input>
                </label>
                </div>
                <Cards
                    locale={valid}
                    cvc={cod_seguridadAlt}
                    expiry={fecha_caducidadAlt}
                    focused={focus}
                    name={nombreAlt + " " +apellido1Alt}
                    number={numero_tarjetaAlt}
                />
            </div>
          </form>
        </div>
      }
       <button onClick={realizarPago}>Realizar Pago</button>
      </div>
      
      <div className="res-info-final">
        <table>
          <thead>
            <tr>
              <th>Concepto</th>
              <th>Tarifa</th>
              <th>Pasajeros</th>
              <th>Maleta</th>
              <th>Seguro</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{n_personas} billete/s</td>
              <td>{tarifa}</td>
              <td>x {n_personas}</td>
              <td>x {n_maletas}</td>
              {seguro_viaje !== 0 ? (
                <td>Si</td>
                ) : (
                <td>No</td>
                )
              }
              <td>{precio_total} €</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Precio Total</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{precio_total} €</td>
            </tr>
          </tfoot>
        </table>
       
        <div id="res-table-info">
          <p>
            *Si por cualquier circunstancia, el día del vuelo, no pudieras
            disponer del asiento que acabas de reservar, te será devuelto el
            importe del pago por la reserva de dicho asiento.
          </p>
        </div>
      </div>
    </div>
  
  );
};
