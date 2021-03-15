import React, { useState } from 'react'
import './Pop.css';

export const Pop = () => {


    const [visible, setVisible] = useState(false);
    const [abierto, setAbierto] = useState(false);
   

    const handleAbrirPop = (e) => {
        e.preventDefault();
       // overlay.classList.add('active');
       // popup.classList.add('active');
    }

    const handleCerrarPop = (e) => {
        e.preventDefault();
      //  overlay.classList.remove('active');
      //  popup.classList.remove('active');
    }

    return (
        <div className="overlay-pop" id="overlay">
			<div className="popup" id="popup">
				<a href="#" id="btn-cerrar-popup" className="btn-cerrar-popup" onClick={handleCerrarPop}><i className="fas fa-times"></i></a>
				<h3>SUSCRIBETE</h3>
				<h4>y recibe un cupon de descuento.</h4>
				<form action="">
					<div className="contenedor-inputs">
						<input type="text" placeholder="Nombre"/>
						<input type="email" placeholder="Correo"/>
					</div>
					<input type="submit" className="btn-submit" value="Suscribirse" />
				</form>
			</div>
		</div>
    )
}
