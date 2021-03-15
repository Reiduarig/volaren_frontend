import React/*, {useState}*/ from 'react';
import { useForm } from '../../../../hooks/useForm';
import  './DatosFact.css';

export const ProfileForm = ({ datos_fact }) => {

    const {nombre, apellido1, apellido2, dni, telefono, direccion, ciudad, cod_postal, provincia, pais, numero_cuenta, cod_seguridad} = datos_fact;
    

    //const [message, setMessage] = useState(null);
    const [formValues, handleInputChange] = useForm({

        nombre: '',
        apellido1: '',
        apellido2: '',
        dni: '',
        telefono:'',
        direccion: '',
        ciudad: '',
        cod_postal: '',
        provincia: '',
        pais:'',
        iban: '',
        numero_cuenta:'',
        cod_seguridad: ''
       
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
    }


    return (
        <div className="account">
            <h1>Datos Facturación</h1>
            <hr/>
        <form id="account-form" onSubmit={ handleSubmit }>
            <div className="form-group">
            <label htmlFor="nombre">
                <p className="lbl-txt">Nombre</p>
                <input type="text" name="nombre" onChange={ handleInputChange }  defaultValue={nombre}></input>
            </label>
            <label htmlFor="apellido1">
                <p className="lbl-txt">1er Apellido</p>
                <input type="text" name="apellido1" onChange={ handleInputChange } defaultValue={ apellido1 }></input>
                </label>
            <label htmlFor="apellido2">
                <p className="lbl-txt">2º Apellido</p>
                <input type="text" name="apellido2" onChange={ handleInputChange } defaultValue={apellido2} ></input>
                </label>
          
            
            <label htmlFor="dni">
            <p className="lbl-txt">Dni</p>
                <input type="text" name="dni" onChange={ handleInputChange } defaultValue={dni}  max='9'></input>
            </label>
            </div>
            <div className="form-group">
           <label htmlFor="telefono">
           <p className="lbl-txt">Teléfono</p>
                <input type="text" name="telefono" onChange={ handleInputChange } defaultValue={telefono}  max="9"></input>
                </label>   
            <label htmlFor="direccion">
            <p className="lbl-txt">Dirección</p>
                <input type="text" name="direccion" onChange={ handleInputChange } defaultValue={direccion} ></input>
            </label>
          
          
            
            <label htmlFor="ciudad">
            <p className="lbl-txt">Ciudad</p>
                <input type="text" name="ciudad" onChange={ handleInputChange } defaultValue={ciudad} ></input>
            </label>
            <label htmlFor="cod_postal">
            <p className="lbl-txt">Cód.Postal</p>
                <input type="text" name="cod_postal" onChange={ handleInputChange } defaultValue={cod_postal} ></input>
            </label>
            </div>
            <div className="form-group">
            <label htmlFor="provincia">
            <p className="lbl-txt">Provincia</p>
                <input type="text" name="provincia" onChange={ handleInputChange } defaultValue={provincia} ></input>
            </label>
            
         
           
            <label htmlFor="pais">
            <p className="lbl-txt">País</p>
                <input type="text" name="pais" onChange={ handleInputChange } defaultValue={pais} ></input>
            </label>
            <label htmlFor="numero_cuenta">
            <p className="lbl-txt">Nº cuenta</p>
                <input type="text" name="numero_cuenta" onChange={ handleInputChange } defaultValue={numero_cuenta} ></input>
            </label>
            <label htmlFor="cod_seguridad">
            <p className="lbl-txt">Cód. seguridad</p>
                <input type="text" name="cod_seguridad" onChange={ handleInputChange } defaultValue={cod_seguridad} ></input>
            </label>
            </div>
            <button type="submit">Cambiar</button>
           
        </form>
        
    </div>
    )
}
