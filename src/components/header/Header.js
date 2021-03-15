import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { types } from '../../types/types';
import logo from  '../../assets/logos/logoVolaren.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog, faPlane, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import './Header.css'


const Header = () => {

  const history = useHistory(); 

  const user = useSelector(s=>s.auth);
  const dispatch = useDispatch();


  const handleLogout = () =>{

    dispatch({
      type: types.logout
    })
    
    history.replace("/");
  
  }

    return (
        <header>
        <NavLink to="/"><img width="90"  height="80" src={logo} alt="logo"/></NavLink>
        <nav>
          <div>
                <NavLink  to="/" title="Vuelos"><FontAwesomeIcon icon={faPlane} />Inicio</NavLink>
          </div>
          <div>
                <NavLink  to="/blog" title="Blog"><FontAwesomeIcon icon={faBlog} />Blog</NavLink>
          </div>
        {!user &&
          <div>
           <NavLink  to="/login" title="Mi cuenta"><FontAwesomeIcon icon={faUserCircle} />Mi cuenta</NavLink>
          </div>
        }
        {user &&
          
          <div className="avatar"  style={{ backgroundImage: `url(http://localhost:3999/api/users/image/${user.image})`}}>
              <div className="dropdown-content">
                  <NavLink to={{
                      pathname:"/dashboard",
                      idUser: user.id
                  }}>Mis reservas</NavLink>
                  <NavLink to={{
                          pathname:"/dashboard/profile"     
                      }}
                      
                      >Perfil</NavLink>
                  <NavLink to={{
                      pathname:"/dashboard/datosFact",
                      idUser: user.id
                  }}>Cuenta</NavLink>
                  <button onClick={ handleLogout } className="btn-logout" title="Salir"><i className="fas fa-sign-out-alt"></i></button>
              </div>
     
          </div>  
                }         
        </nav>
      </header>
    )
}

export default Header
