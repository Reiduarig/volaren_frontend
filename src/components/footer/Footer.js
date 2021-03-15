import React from 'react'
import './Footer.css';
import twitter from '../../assets/logos/twitter.png';
import instagram from '../../assets/logos/instagram.png';
import facebook from '../../assets/logos/facebook.png';

const Footer = () => {
    return (
        <div className="footer">
            <div id="capa-footer">
                <div className="content-footer">
                    <h4>Conócenos</h4>
                    <nav>
                        <li>Quiénes somos</li>
                        <li>Condiciones Generales</li>
                        <li>Política de Privacidad</li>
                        <li>Política de Cookies</li>
                        <li>Programa de Afiliados</li>
                        <li>Empleo</li>
                    </nav>
                </div>
                <div className="content-footer">
                    <h4>Ayuda</h4>
                    <nav>
                        <li>Soporte 24 x 7</li>
                        <li>Covid-19-Actualizaciones de viaje</li>
                        <li>Covid-19-Procedimientos de reembolso</li>
                        <li>Información sobre aerolíneas</li>
                    </nav>    
                </div>
                <div className="content-footer" id="rrss">
                    <h4>Síguenos en</h4>
                    <img src={twitter} width="30" height="30" alt="twitter"/>
                    <img src={instagram} width="30" height="30" alt="instagram"/>
                    <img src={facebook} width="30" height="30" alt="facebook"/>
                </div>
            </div>
        </div>
    )
}

export default Footer
