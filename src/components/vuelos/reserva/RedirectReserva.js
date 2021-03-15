import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import paper from '../../../assets/paper_plane.gif';
import { NavLink } from 'react-router-dom'
import './RedirectReserva.css';
export const RedirectReserva = () => {

    
    return (
        <div className="containerRedirect">
            <div className="cardInfo">
                <h1>Reserva realizada con éxito</h1>
                <h3>¡Te hemos enviado un correo con la información de tu reserva!</h3>
                <img src={paper} width="500" height="400" alt="plane"/>
               
            </div>
            <div className="linksContainer">
                <NavLink to="/">Reservar vuelos</NavLink>
                <NavLink to="/dashboard/historico">Mis reservas</NavLink>
            </div>
        </div>
    )
}
