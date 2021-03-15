import React, {useState} from 'react'
import { useForm } from '../../../hooks/useForm';
/* DatePicker */
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Switch from "../../switch/Switch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
registerLocale("es", es);


export const ListaFiltro = ({parametros}) => {

    //console.log(parametros)

const [fecha_salida, setFechaIda] = useState();
const [fecha_vuelta, setFechaVuelta] = useState();
const [directo, setDirecto] = useState(false);
const [idavuelta, setIdaVuelta] = useState(false);



  const [formValues, handleInputChange] = useForm({
    origen: parametros.origen,
    destino:parametros.destino,
    precio: parametros.precio, 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }

  const {origen, destino, precio } = formValues;
    return (
        <div>
            <form id="fliesForm" onSubmit={handleSubmit}>
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
                    minDate={new Date()}
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
                    <span>Máx</span>
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
                <button type="submit" className="btn-filtro-vuelos" value="Buscar"><FontAwesomeIcon icon={faSearch}/></button>
            </form>
            
        </div>
    )
}
