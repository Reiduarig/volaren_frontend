import React from 'react'
import { NavLink } from 'react-router-dom';
import './Pdf.css';
export const Pdf = (props) => {

    console.log(props)

    const documento = props.location.documento;

    return (
    <div id="pdf-container">   
        <object 
            aria-label="pdf"
            height="700px"
            key={documento.id} 
            target="_blank"
            data={`http://localhost:3999/api/reserva/pdf/${documento.url}`} 
            type="application/pdf"
            alt={documento.url}/>
            <div className="documentPdfBtn">
                <NavLink to="/dashboard/historico" className="btn-documentPdf">Volver</NavLink>
            </div>
    </div>        
    )
}
