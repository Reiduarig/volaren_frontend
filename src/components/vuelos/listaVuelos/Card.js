import { faDotCircle, faInfoCircle, faPlaneDeparture, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover, Button } from 'antd';
import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import Moment from 'react-moment';

export const Card = ({ vuelo }) => {


  const {imagen} = vuelo;
 
  const title = (
    <div className="Pop-profileCities">
        <FontAwesomeIcon icon={faPlaneDeparture}/>
        <span>De {vuelo.origen} a {vuelo.destino} - <Moment format="ddd,LL">{vuelo.fecha_salida}</Moment></span>
    </div>
  )
  const content = (

            <div className="pop-profileFly-itinerario">
              <div className="pop-profileFly-itinerarioHeader">
                  <span>{vuelo.nombre} {vuelo.aerolinea_id}{vuelo.id}</span>
                  <span style={{color:"lightgreen", fontWeight:"600"}}><FontAwesomeIcon icon={faShoppingBag}/> Equipaje de mano incl.</span>
              </div>
              <div className="pop-profileFly-itinerarioBody">
                <span><FontAwesomeIcon icon={faDotCircle}></FontAwesomeIcon>
                    {vuelo.hora_salida.substring(0, 5)} - {vuelo.origen} ( {vuelo.n_aerop_origen} )
                </span>
                <span className="itinerarioPopLine"></span>
                <span><FontAwesomeIcon icon={faDotCircle}></FontAwesomeIcon>
                    {vuelo.hora_llegada.substring(0, 5)} - {vuelo.destino} ({vuelo.n_aerop_destino})
                </span>
              </div>
            </div>
            
            
         
  );
  const content2 = (
    <>
    <div className="pop-profileFly-itinerario">
      <div className="pop-profileFly-itinerarioHeader">
          <span>{vuelo.nombre} {vuelo.aerolinea_id}{vuelo.id}</span>
          <span style={{color:"lightgreen", fontWeight:"600"}}><FontAwesomeIcon icon={faShoppingBag}/> Equipaje de mano incl.</span>
      </div>
      <div className="pop-profileFly-itinerarioBody">
        <span><FontAwesomeIcon icon={faDotCircle}></FontAwesomeIcon>
            {vuelo.hora_salida.substring(0, 5)} - {vuelo.origen} ( {vuelo.n_aerop_origen} )
        </span>
        <span className="itinerarioPopLine"></span>
        <span><FontAwesomeIcon icon={faDotCircle}></FontAwesomeIcon>
            {vuelo.hora_llegada.substring(0, 5)} - {vuelo.destino} ({vuelo.n_aerop_destino})
        </span>
      </div>
    </div>
    <div className="Pop-profileCities2">
        <FontAwesomeIcon icon={faPlaneDeparture}/>
        <span>De {vuelo.destino} a {vuelo.origen} - <Moment format="ddd,LL">{vuelo.fecha_vuelta}</Moment></span>
    </div>
    <div className="pop-profileFly-itinerario">
    <div className="pop-profileFly-itinerarioHeader">
        <span>{vuelo.nombre} {vuelo.aerolinea_id}{vuelo.id + 10}</span>
        <span style={{color:"lightgreen", fontWeight:"600"}}><FontAwesomeIcon icon={faShoppingBag}/> Equipaje de mano incl.</span>
    </div>
    <div className="pop-profileFly-itinerarioBody">
      <span><FontAwesomeIcon icon={faDotCircle}></FontAwesomeIcon>
          {vuelo.hora_salida.substring(0, 5)} - {vuelo.destino} ( {vuelo.n_aerop_destino} )
      </span>
      <span className="itinerarioPopLine"></span>
      <span><FontAwesomeIcon icon={faDotCircle}></FontAwesomeIcon>
          {vuelo.hora_llegada.substring(0, 5)} - {vuelo.origen} ({vuelo.n_aerop_origen})
      </span>
    </div>
  </div>
  </>    
 
);

  return (
    <>
    {vuelo.vuelta ==="n" &&
    
    <div id="profiler-fly" >
      <div id="container-profile">
        <div id="info-fly">
          <div id="profile-header">
            <div className="profileCities">
              <i className="fas fa-plane-departure"></i>
              <p>{vuelo.origen}</p>
              <i className="fas fa-plane-arrival"></i>
              <p>{vuelo.destino}</p>
              <div id="info-pop">
              <Popover content={content} title={title} placement="bottomRight" trigger="click">
                <Button><FontAwesomeIcon icon={faInfoCircle} size="2x" color="tomato"/></Button>
              </Popover>
              </div>
            </div>
            <div className="profileFly-fecha">
              <i className="fas fa-calendar"></i>
              <p>
                <Moment format="ddd,LL">{vuelo.fecha_salida}</Moment>
              </p>  
            </div>
          </div>
          <div id="profile-stop">
            <div id="profile-airlineImage">
              <img src={`http://localhost:3999/api/vuelos/image/${imagen}`} alt={vuelo.aerolinea} />
            </div>
            <div id="profile-airline">
              <span>{vuelo.nombre}</span>
              <span>{vuelo.clase}</span>
            </div>
            <div id="profile-time">
              <div id="profile-time-up">
                <span>{vuelo.hora_salida.substring(0, 5)} - {vuelo.hora_llegada.substring(0, 5)}</span>
              </div>
              <div id="profile-time-down">
                <span>{vuelo.aeropuerto_origen}</span>
                <span>{vuelo.aeropuerto_destino}</span>
              </div>
            </div>
            <div id="profile-duracion">
              {vuelo.escalas === 0 ? (
                <span>Directo</span>
              ) : (
                <p>{vuelo.escalas} escala/s</p>
              )}
              <span>{vuelo.duracion} h</span>
            </div>
            <div id="profile-price">
              <span>{vuelo.precio} € <span className="profile-price-txt">/pers.</span></span>
              <Link to={`/reserva/${vuelo.id}`} id="btn-src-flyReserve">
              Continuar
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
  </div>
    </div>
  }
  {
    vuelo.vuelta==="s" &&
        <div id="profiler-fly">
          <div id="container-profile">
            <div id="info-fly">
              <div id="profile-header">
                <div className="profileCities">
                  <i className="fas fa-plane-departure"></i>
                  <p>{vuelo.origen}</p>
                  <i className="fas fa-plane-arrival"></i>
                  <p>{vuelo.destino}</p>
                  <div id="info-pop">
                  <Popover content={content2} title={title} placement="bottomRight" trigger="click">
                    <Button><FontAwesomeIcon icon={faInfoCircle} size="2x" color="tomato"/></Button>
                  </Popover>
                  </div>
                </div>
                <div className="profileFly-fecha">
                  <i className="fas fa-calendar"></i>
                  <p>
                  <Moment format="ddd,LL">{vuelo.fecha_salida}</Moment>
                  </p>  
                </div>
              </div>
              <div id="profile-stop">
                <div id="profile-airlineImage">
                  <img src={`http://localhost:3999/api/vuelos/image/${imagen}`} alt={vuelo.aerolinea} />
                </div>
                <div id="profile-airline">
                  <span>{vuelo.nombre}</span>
                  <span>{vuelo.clase}</span>
                </div>
                <div id="profile-time">
                  <div id="profile-time-up">
                    <span>{vuelo.hora_salida.substring(0, 5)}</span>
                    -
                    <span>{vuelo.hora_llegada.substring(0, 5)}</span>
                  </div>
                  <div id="profile-time-down">
                    <span>{vuelo.aeropuerto_origen}</span>
                    <span>{vuelo.aeropuerto_destino}</span>
                  </div>
                </div>
                <div id="profile-duracion">
                  {vuelo.escalas === 0 ? (
                    <span>Directo</span>
                  ) : (
                    <p>{vuelo.escalas} escala/s</p>
                  )}
                  <span>{vuelo.duracion} h</span>
                </div>
                <div id="profile-price">
                  <span>{vuelo.precio} € <span className="profile-price-txt">/pers.</span></span>
                 
                </div>
              </div>
              <div id="profile-stop" style={{padding:"0px 10px 40px 10px"}}>
                <div id="profile-airlineImage">
                  <img src={`http://localhost:3999/api/vuelos/image/${imagen}`} alt={vuelo.aerolinea} />
                </div>
                <div id="profile-airline">
                  <span>{vuelo.nombre}</span>
                  <span>{vuelo.clase}</span>
                </div>
                <div id="profile-time">
                  <div id="profile-time-up">
                    <span>{vuelo.hora_salida.substring(0, 5)}</span>
                    -
                    <span>{vuelo.hora_llegada.substring(0, 5)}</span>
                  </div>
                  <div id="profile-time-down">
                    <span>{vuelo.aeropuerto_destino}</span>
                    <span>{vuelo.aeropuerto_origen}</span>
                  </div>
                </div>
                <div id="profile-duracion">
                  {vuelo.escalas === 0 ? (
                    <span>Directo</span>
                  ) : (
                    <p>{vuelo.escalas} escala/s</p>
                  )}
                  <span>{vuelo.duracion} h</span>
                </div>
                <div id="profile-price">
                  <span>{vuelo.precio} € <span className="profile-price-txt">/pers.</span></span>
                  <Link to={`/reserva/${vuelo.id}`} id="btn-src-flyReserve">
                  Continuar
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
      </div>
      </div>
  }
    </>
  );
};
