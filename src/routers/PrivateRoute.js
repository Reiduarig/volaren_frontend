import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
/*Como este método lo podriamos reutilizar en otros proyectos seria conveniente
 agregarle una validación con PropTypes*/
/*creamos una propiedad llamada authenticated, el componente que se quiere renderizar,
  y el resto de argumentos o props como path,etc ... almacenadolos en el operador ...rest*/
export const PrivateRoute = (
    {
        user,
        component: Component,
        ...rest
    } 
) => {
    /*Se retorna una ruta el la que se pasa como referencia 
    el resto de las propiedades recibidas  y se retorna el componente con un callback 
    pasandole las props (en este caso history,location y params) y una condición para comprobar
    que el usuario está autenticado, si lo está, se renderizará el componente al cual el usuario quiere entrar,
    adicionadole las props, si no está autenticado se le redigirá a la pagina de login*/
    
    return (
       
        <Route {...rest}
            component={ (props) => (
                 ( user )
                    ? <Component { ...props } />
                    : (<Redirect to="/login" />)
            )}
          
        />
        
    )
}
PrivateRoute.propTypes = {
    token: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired
}