import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAllById, updateFacturacion } from "../../../helpers/Http";
import { finishLoading, removeError, setError, startLoading } from "../../../reducers/uiReducer";
import Swal from 'sweetalert2';
import "./DatosFact.css";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const valid={
  valid: 'Caduca'
}

export const DatosFact = () => {
  
  const user = useSelector(s=>s.auth);

  
  const estado = useSelector(state => state.ui);
  const { msgError} = estado;
  const dispatch = useDispatch();

  const [focus, setFocus] = useState('')
  const [datosFact, setdatosFact] = useState({
    nombre: "",
    apellido1: "",
    apellido2: "",
    dni: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    cod_postal: "",
    provincia: "",
    pais: "",
    fecha_caducidad: "",
    numero_tarjeta: "",
    cod_seguridad: "",
 
  });

  const {
    nombre,
    apellido1,
    apellido2,
    dni,
    telefono,
    direccion,
    ciudad,
    cod_postal,
    provincia,
    pais,
    fecha_caducidad,
    numero_tarjeta,
    cod_seguridad,
  } = datosFact;

  useEffect(() => {
    dispatch( removeError() );
    getUserAllById(user.id)
      .then((res) => {

        dispatch(startLoading())

        if (res.ok) {
          const { data } = res;
         
          dispatch( finishLoading() );
         

          setdatosFact({
            nombre: data[0].nombre,
            apellido1: data[0].apellido1,
            apellido2: data[0].apellido2,
            dni: data[0].dni,
            telefono: data[0].telefono,
            direccion: data[0].direccion,
            ciudad: data[0].ciudad,
            cod_postal: data[0].cod_postal,
            provincia: data[0].provincia,
            pais: data[0].pais,
            fecha_caducidad: data[0].fecha_caducidad,
            numero_tarjeta: data[0].numero_tarjeta,
            cod_seguridad: data[0].cod_seguridad,
          });

          dispatch( removeError() );
        } else {
          dispatch( finishLoading() );
         
         
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = ({ target }) => {
    setdatosFact({
      ...datosFact,
      [target.name]: target.value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      dispatch( startLoading() );
      updateFacturacion(
        user.id,
        nombre,
        apellido1,
        apellido2,
        dni,
        telefono,
        direccion,
        ciudad,
        cod_postal,
        provincia,
        pais,
        fecha_caducidad,
        numero_tarjeta,
        cod_seguridad
      ).then((res) => {
        if (res.ok) {
          dispatch( removeError() );
          dispatch( finishLoading() );
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Los datos han sido actualizados`,
            showConfirmButton: false,
            timer: 2000
          })
        
        } else {
          dispatch( finishLoading() );
          dispatch( setError(res.message) );
          
        }
      });
    } catch (e) {
      console.log(e.message);
      dispatch( finishLoading() );
     
    }finally{
      dispatch( finishLoading() );
    } 
  };

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
}

  return (
    <div className="account">
      <div className="bannerFact">
        <h1>Mis Datos de Facturación</h1>
      </div>
      <form id="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">
            <p className="lbl-txt">Nombre</p>
            <input
              type="text"
              name="nombre"
              onChange={handleInputChange}
              defaultValue={nombre}
            ></input>
          </label>
          <label htmlFor="apellido1">
            <p className="lbl-txt">1er Apellido</p>
            <input
              type="text"
              name="apellido1"
              onChange={handleInputChange}
              defaultValue={apellido1}
            ></input>
          </label>
          <label htmlFor="apellido2">
            <p className="lbl-txt">2º Apellido</p>
            <input
              type="text"
              name="apellido2"
              onChange={handleInputChange}
              defaultValue={apellido2}
            ></input>
          </label>
          <label htmlFor="dni">
            <p className="lbl-txt">Dni</p>
            <input
              type="text"
              name="dni"
              onChange={handleInputChange}
              defaultValue={dni}
              max="9"
            ></input>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="telefono">
            <p className="lbl-txt">Teléfono</p>
            <input
              type="text"
              name="telefono"
              onChange={handleInputChange}
              defaultValue={telefono}
              max="9"
            ></input>
          </label>
          <label htmlFor="direccion">
            <p className="lbl-txt">Dirección</p>
            <input
              type="text"
              name="direccion"
              onChange={handleInputChange}
              defaultValue={direccion}
            ></input>
          </label>
          <label htmlFor="ciudad">
            <p className="lbl-txt">Ciudad</p>
            <input
              type="text"
              name="ciudad"
              onChange={handleInputChange}
              defaultValue={ciudad}
            ></input>
          </label>
          <label htmlFor="cod_postal">
            <p className="lbl-txt">Cód.Postal</p>
            <input
              type="text"
              name="cod_postal"
              onChange={handleInputChange}
              defaultValue={cod_postal}
            ></input>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="provincia">
            <p className="lbl-txt">Provincia</p>
            <input
              type="text"
              name="provincia"
              onChange={handleInputChange}
              defaultValue={provincia}
            ></input>
          </label>
          <label htmlFor="pais">
            <p className="lbl-txt">País</p>
            <input
              type="text"
              name="pais"
              onChange={handleInputChange}
              defaultValue={pais}
            ></input>
          </label>
        </div>
        <div id="paymentForm">
          <div id="paymentFormInputs">
          <label htmlFor="numero_tarjeta">
            <p className="lbl-txt">Nº tarjeta</p>
            <input
              type="text"
              name="numero_tarjeta"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              defaultValue={numero_tarjeta}
              maxLength="16"
              minLength="16"
            ></input>
          </label>
          <label htmlFor="fecha_caducidad">
            <p className="lbl-txt">Caducidad</p>
            <input
              type="text"
              name="fecha_caducidad"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              defaultValue={fecha_caducidad}
              maxLength="4"
              minLength="3"
            ></input>
          </label>
          <label htmlFor="cod_seguridad">
            <p className="lbl-txt">Cód. seguridad</p>
            <input
              type="text"
              name="cod_seguridad"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              defaultValue={cod_seguridad}
              maxLength="4"
              minLength="3"
            ></input>
          </label>
          </div>
          <Cards
              locale={valid}
              cvc={cod_seguridad}
              expiry={fecha_caducidad}
              focused={focus}
              name={nombre + " " +apellido1}
              number={numero_tarjeta}
          />
        </div>
        <button type="submit" >Actualizar</button>
      </form>
      {msgError && <span>{msgError}</span>}
    </div>
  );
};
