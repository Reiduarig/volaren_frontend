import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { envioLogin } from "../../helpers/Http";
import { useDispatch, useSelector } from 'react-redux';
import  validator from "validator";
import "./Login.css";

import Swal from 'sweetalert2';
import { startLoading, finishLoading } from "../../reducers/uiReducer";
import { login } from "../../actions/auth";


const Login = () => {

  const history = useHistory()

  const estado = useSelector(state => state.ui);
  const { msgError, loading} = estado;

  const dispatch = useDispatch();

  const [access,setAccess] = useState(false);
  const [error, setError] = useState(null);
  // se pasan los valores del form al hook
  const [formValues, handleInputChange] = useForm({
      email: "",
      password: "",
  });

  const { email, password } = formValues;


  const isFormValid = () => {
    
    
    if( !validator.isEmail( email ) ){
      
      setError('Email incorrecto');
      return false;

    }else if(password.length <= 6){
      
      setError('La contraseña debe tener mínimo 6 caracteres');
      return false;

    }
     
    setError(null);
    setAccess(true);
    return true;
  }

  if(access){
    return <Redirect to="/"/>
  }

  //se llama al metodo del helper que se encarga de hacer la peticion cuando enviamos el formulario

  const handleSubmit = async (e) => {
      e.preventDefault();

      if(isFormValid()){

        dispatch( startLoading() );
      
        envioLogin(email, password).then(respuesta => {

          if(respuesta.ok){

              dispatch( login(
                              respuesta.id,
                              respuesta.name,
                              respuesta.email,
                              respuesta.image,
                              respuesta.token,
                            )
                        )

              dispatch( finishLoading() )

                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: `<h2>Bienvenido <span style="text-transform:capitalize">${respuesta.name}</span></h2>`,
                  showConfirmButton: false,
                  timer: 3000
                })

                history.push('/');

          }else{
            dispatch(setError(respuesta.message))
            dispatch( finishLoading() )
          }      
        
        }).catch(e => {
            console.log(e);
            dispatch( finishLoading() )
        })

      }
    }      


  return (
    <div className="auth-container">
      <div id="logReg-container">
        <div id="login-container">
          <form className="login-form"  onSubmit={handleSubmit}>
            <div className="form-input-material">
              <label>
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  id="loginEmail"
                  autoComplete="on"
                  className="auth_input"
                  onChange={handleInputChange}
                  placeholder="ejemplo@email.com"
                  value={email}
                  autoFocus
                />
                <div className="line-box">
                  <div className="line"></div>
                </div>
              </label>
            </div>
            <div className="form-input-material">
              <p>Password</p>
              <label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="auth_input"
                  placeholder="Password"
                  value={password}
                  onChange={handleInputChange}
                 
                />
                <div className="line-box">
                  <div className="line"></div>
                </div>
              </label>
            </div>
            <button 
                  className="btn btn-primary btn-ghost"
                  disabled={loading}
                  >
                  Iniciar sesión
            </button>
          
            <Link to="/register">¿Todavía no estas registrado?</Link>
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

export default Login;
