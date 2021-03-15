import React, { useState, useEffect } from 'react'
import { getDocumentsReserve } from '../../helpers/Http';
import { Link, useParams } from 'react-router-dom';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import billete from '../../assets/images/billete.png';
import transporte from '../../assets/images/transporte.png';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';
import 'moment/locale/es';
import './Documents.css';
import Meta from 'antd/lib/card/Meta';
export const Documents = () => {

    const {id} = useParams();
    const [messages, setMessages] = useState(null);
    const [documentos, setDocumentos] = useState([]);

    useEffect( () => {
        
        getDocumentsReserve(id).then(response => {


            if(!response.data.ok){
                setDocumentos([]);
                setMessages(response.data.message);
            }
            else{
                
                setDocumentos( response.data.data);
                setMessages(null);
            }
        });    
    },[]);



    return (
        
        <div className="containerDocuments">
            <div id="lista-docs-reserva">
            {messages && <span>{ messages }</span>}
                {documentos.length > 0 && 
                    documentos.map(documento => (
                        <Card key={documento.id}
                        style={{ width: 250, padding: 5, marginBottom: 40 }}
                        cover={
                            
                        <img
                            alt="example"
                            src={documento.tipo === 'Reserva' || documento.tipo === 'qr' ? (billete) : (transporte)}
                        />
                        }
                      
                    >
                        <Meta
                        title={<h4>{documento.descripcion}</h4>}
                        description={<p><Moment locale="es" fromNow>{documento.fecha}</Moment></p>}
                        />
                       <Link to={{
                                    pathname:"/dashboard/pdf",
                                    documento
                                }}><FontAwesomeIcon icon={faFilePdf} size="4x" /></Link>
                    </Card>
    
                       
                      
                    ))
                }
                
            </div>
            
           
          
        </div>    
          
  
    )
}
