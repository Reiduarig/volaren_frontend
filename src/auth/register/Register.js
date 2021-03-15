import React, {useState} from "react";
import { Link, Redirect } from "react-router-dom";
import { envioRegistro } from "../../helpers/Http";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import  validator from "validator";
import logo_volaren from '../../assets/logos/logoVolaren.png';
import "./Register.css";

import Swal from "sweetalert2";

const Register = () => {

  const dispatch =  useDispatch();
  //el selector dispara un callback el cual tiene el state actual del reducer
  //extraemos el UI del objeto que es lo que necesitamos para este caso
  const estado = useSelector(state => state.ui);


  const [access, setAccess] = useState(false);
  const [setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [formValues, handleInputChange, reset] = useForm({
    username: "",
    email: "",
    password: "",
    password2:"",
  });

  const { username, email, password, password2 } = formValues;

  const isFormValid = () => {
    //limpiamos el nombre y comprobamos la longitud
    if(username.trim().length === 0){
      
      setError("Nombre de usuario requerido");
      return false;
    
    }else if( !validator.isEmail( email ) ){
      
      setError('Email incorrecto');
      return false;

    }else if(password.length <= 6){
      
      setError('La contraseña debe tener mínimo 6 caracteres');
      return false;

    }
    else if(password !== password2){
     
      setError('Las contraseñas no coinciden');
      return false;

    }
     
    setError(null);
    
    return true;
  }


  const handleSubmit = async (e) => {

    e.preventDefault();

    if(isFormValid()){
      const respuesta = await envioRegistro(username, email, password);
        if(!respuesta.ok){
          setMessage(respuesta.message);
          setAccess(false);
        }else{
          reset()
          Swal.fire({
            position: 'center',
            icon: 'success',
            width: '60%',
            title: `Registro completado. Le hemos enviado un correo para activar su cuenta de usuario`,
            showConfirmButton: false,
            timer: 4000,
            imageUrl: logo_volaren,
            imageWidth: '200px',
            imageAlt:'logo'
          })
          setAccess(true);
        }
    }

    
  };


  if(access){
    return <Redirect to="/login" />
  }
  
  return (
    <div className="auth-container">
    <div id="logReg-container">
      <div id="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-input-material">
            <p>Nombre</p>
            <label>
              <input
                type="text"
                name="username"
                id="registerUsername"
                autoComplete="off"
                className="input"
                onChange={handleInputChange}
                value={username}
                placeholder="Username"
                autoFocus
              />
              <div className="line-box">
                <div className="line"></div>
              </div>
            </label>
          </div>
          <div className="form-input-material">
            <p>Email</p>
            <label>
              <input
                type="email"
                name="email"
                id="registerEmail"
                autoComplete="off"
                className="input"
                placeholder="ejemplo@email.com"
                onChange={handleInputChange}
                value={email}
               
              />
              <div className="line-box">
                <div className="line"></div>
              </div>
            </label>
          </div>
          <div className="form-input-material">
            <label>
              <p>Password</p>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                className="input"
                placeholder="Password"
                onChange={handleInputChange}
                value={password}
                
              />
              <div className="line-box">
                <div className="line"></div>
              </div>
              </label>
              </div>
              <div className="form-input-material">
                <p>Confirme Password</p>
                <label>
                  <input
                    type="password"
                    name="password2"
                    id="password2"
                    autoComplete="off"
                    className="input"
                    placeholder="Confirme la password"
                    onChange={handleInputChange}
                    value={password2}
                   
                  />
                  <div className="line-box">
                    <div className="line"></div>
                  </div>
                </label>
             </div>
          <button type="submit " className="btn btn-primary btn-ghost">
            Enviar
          </button>

          <Link to="/login">¿Ya estas registrado?</Link>
          {
            error &&
              <div className="auth_alert-error">
                 {error}
              </div>
          }
        </form>
      </div>
    </div>
    </div>
  );
};

export default Register;
