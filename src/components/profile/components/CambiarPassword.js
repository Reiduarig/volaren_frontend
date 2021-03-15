import React,{ useState } from 'react'
import validator from 'validator';
import { useForm } from '../../../hooks/useForm';
import Swal from "sweetalert2";
import './CambiarPassword.css';

export const CambiarPassword = () => {


    const [error, setError] = useState(null);
    const [formValues, handleInputChange] = useForm({
        password: "",
        passwordNew: "",
    });

    const { password, passwordNew } = formValues;

    const isFormValid = () => {
        
        if( validator.isEmpty( password ) || validator.isEmpty(passwordNew)){
      
            setError('Los campos son requeridos');
            return false;
      
        }else if(passwordNew === password){
            
           setError('Las contraseñas no pueden ser iguales')
            return false;
      
        }else if(passwordNew.trim().length < 6){
            setError('La nueva contraseña debe tener 6 caracteres como mínimo')
            return false;
        }
        setError(null);
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
  
        if(isFormValid()){

            Swal.fire({
                position: 'top',
                icon: 'success',
                title: `Contraseña modificada`,
                showConfirmButton: false,
                timer: 2000
              })
           
        }
    }
    return (
        <div className="password-container">
           
                <h1>Cambiar contraseña</h1>
           
            <div className="section-password">
                <form className="password-form"  onSubmit={handleSubmit}>
                
                    <label>
                        <p>Contraseña actual</p>
                        <input
                        type="password"
                        name="password"
                        id="passActual"
                        autoComplete="off"
                        className="auth_input"
                        onChange={handleInputChange}
                        placeholder="Introduce tu contraseña"
                        value={password}
                        autoFocus
                        />
                    </label>
                
                    
                    <label>
                        <p>Nueva contraseña</p>
                        <input
                        type="password"
                        name="passwordNew"
                        id="passwordNew"
                        className="auth_input"
                        placeholder="Introduce la nueva contraseña"
                        value={passwordNew}
                        onChange={handleInputChange}
                        
                        />
                    </label>
                
                    <button 
                        className="btn btn-primary btn-ghost"
                        >
                        Cambiar contraseña
                    </button>
                    {
                    error &&
                    <div className="pass_alert-error">
                        {error}
                    </div>
                    }
                </form>
            </div>
        </div>
    )
}
