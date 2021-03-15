import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import Switch from "../switch/Switch";
import { Spinner } from "../spinner/Spinner";

/* DatePicker */
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { SimpleSlider } from '../../components/slider/Slider';
import image1 from '../../assets/images/newyorkskyline.jpg';
import image2 from '../../assets/images/pagoda.jpg';
import image3 from '../../assets/images/cappadocia.jpg';
import "./FliesSearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Cover } from "../../pages/home/components/Cover";
registerLocale("es", es);



export const FliesSearch = () => {

  const settings =  {
    arrows: false,
    adaptiveHeight: true,
    duration: 500,
    autoplay: true,
    autoplaySpeed: 8000,
};

 

const [fecha_salida, setFechaIda] = useState();
const [fecha_vuelta, setFechaVuelta] = useState();
const [directo, setDirecto] = useState(false);
const [idavuelta, setIdaVuelta] = useState(false);
const [n_personas, setNpersonas] = useState(1);


  const [formValues, handleInputChange] = useForm({
    origen: "",
    destino: "",
    clase:"turista",
    precio: "50", 
  });

  const {origen, destino, clase, precio } = formValues;

  
  return (
    <div id="container-searchForm">
       <Cover />
       <SimpleSlider width="100%" heigth="500" settings={settings} image1={image1} image2={image2} image3={image3}/>
      <form id="fliesForm">
        <div id="fliesform-body">
          <label htmlFor="origen">
            <i className="far fa-paper-plane"></i>
            <input
              type="text"
              name="origen"
              id="origenSearch"
              autoComplete="off"
              className="input"
              placeholder="Origen"
              onChange={handleInputChange}
              value={origen}
              required
              autoFocus
            />
          </label>
          <label htmlFor="destino">
            <i className="far fa-paper-plane"></i>
            <input
              type="text"
              name="destino"
              id="destinoSearch"
              placeholder="Destino"
              autoComplete="off"
              className="input"
              value={destino}
              onChange={handleInputChange}
              required
            />
          
          </label>
          <label htmlFor="fecha_ida">
            <i className="far fa-calendar-alt"></i>
            <DatePicker
              className="input"
              id="fecha_ida"
              name="fecha_ida"
              dateFormat="dd/MM/yyyy"
              selected={fecha_salida}
              placeholderText="Fecha de ida"
              locale="es"
              onChange={date => setFechaIda(date)}
              isClearable
              minDate={new Date()}
             // required
            />
          </label>
          <label htmlFor="fecha_vuelta">
            <i className="far fa-calendar-alt"></i>
            <DatePicker
              className="input"
              id="fecha_vuelta"
              name="fecha_vuelta"
              dateFormat="dd/MM/yyyy"
              selected={fecha_vuelta}
              placeholderText="Fecha de vuelta"
              onChange={date => setFechaVuelta(date)}
              locale="es"
              disabled= {idavuelta}  //{disabled}
              //minDate={new Date(), 5)}
              isClearable
            />
          
          </label>
          <label htmlFor="directo" id="oneWay">
               <span>Directo</span>
              <Switch value={directo} setValue={setDirecto} name="directo"/>
          </label>
          <label htmlFor="idavuelta">
            <span>Sólo ida</span>
           <Switch value={idavuelta} setValue={setIdaVuelta} name="idavuelta" />
          </label>
          <label htmlFor="precio" id="lb-range" >
            <span>Precio máx</span>
            <input
              type="range"
              id="rangePrecio"
              name="precio"
              max="1000"
              min="50"
              step="50"
              onChange={handleInputChange}
            />
          </label>
          <label id="sh-price" className="shadow">
            <span id="showPrecio"> {precio} €</span>
          </label>
         </div>
         <div id="fliesform-footer">
          <div id="spinner-personas">
            <span>Personas</span>
            <Spinner name="n_personas" value={n_personas} setValue={setNpersonas} min={1} max={3} />
          </div>
          <label htmlFor="clase">
            <span>Clase</span>
            <select name="clase" id="clase" onChange={handleInputChange}>
              <option value="turista">Turista</option>
              <option value="business">Business</option>
              <option value="primera">Primera</option>
            </select>
          </label>
          <NavLink className="btn-search-a" to={{ 
            pathname: `/listaVuelos`,
            state: {origen, destino, fecha_salida, fecha_vuelta, directo, idavuelta, precio, clase, n_personas}
          }} ><FontAwesomeIcon icon={faSearch}/> Buscar</NavLink>
        </div>
      </form>
     
    </div>
  );
};
