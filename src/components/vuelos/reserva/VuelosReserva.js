import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { finishLoading, removeError, setError, startLoading } from "../../../reducers/uiReducer";
import { Tabs } from 'antd';
import { InfoCabecera } from "./components/InfoCabecera";
import { Pasajeros } from "./components/Pasajeros";
import { DatosContacto } from "./components/DatosContacto";
import { FactEquipaje } from "./components/FactEquipaje";
import { InfoVuelo } from "./components/InfoVuelo";
import { SeguroEquipaje } from "./components/SeguroEquipaje";
import { Transporte } from "./components/Transporte";

import { VueloPasarela } from "./VueloPasarela";
import { getVueloById } from '../../../helpers/Http';
import { Pop } from '../../Pop';
import "./VuelosReserva.css";
import 'antd/dist/antd.css';
const { TabPane } = Tabs;

export const VuelosReserva = () => {

 
  const { idVuelo } = useParams();
  const estado = useSelector((state) => state.ui);
  const user = useSelector((state) => state.auth);
  const { msgError } = estado;
  const dispatch = useDispatch();

  const [vuelo, setVuelo] = useState({});
  const [reserva, setReserva] = useState({
    n_maletas:0,
    n_personas:1,
    precio_total:0,
    transporte: 0,
    seguro_viaje:false,
    datos_contacto:{
    contacto_email:'',
    contacto_telefono:''
    },
    datos_pasajeros:{
      nombre:'',
      apellido1:'',
      apellido2:'',
      dni:''
    },
    tarifa:'turista'
  })
  
  const [datos_facturacion, setDatosFacturacion] = useState([])
  const [tabActive, setTabActive] = useState("1");
 

  useEffect(() => {
   
    getVueloById(idVuelo)
      .then((res) => {
        dispatch(startLoading());
      
        if (res.ok) {
          dispatch(finishLoading());
          dispatch(setError(null));
          setVuelo(res.data[0]);
          if(user){
            if(res.data[0].vuelta === 's'){
              setReserva({
                ...reserva,
                user_id: user.id || '',
                vuelo_id: res.data[0].id,
                n_personas: res.data[0].n_personas,
                precio_total: res.data[0].precio * 2 * res.data[0].n_personas,
                tarifa: res.data[0].clase
              })
            }else{
              setReserva({
                ...reserva,
                user_id: user.id || '',
                vuelo_id: res.data[0].id,
                n_personas: res.data[0].n_personas,
                precio_total: res.data[0].precio * res.data[0].n_personas,
                tarifa: res.data[0].clase
              })
            }
          }else{
            setReserva({
              ...reserva,
              vuelo_id: res.data[0].id,
              n_personas: res.data[0].n_personas,
              precio_total: res.data[0].precio * res.data[0].n_personas,
              tarifa: res.data[0].clase
            })
          }
         
        } else {
          dispatch(finishLoading());
          dispatch(setError(res.message));
          setVuelo({});
        }
      })
      .catch((error) => {
        dispatch(finishLoading());
        console.log(error);
      });
  }, []);


  
const prev = (e) => {
  e.preventDefault();
  if(parseInt(tabActive) >= 0){
    setTabActive(parseInt(tabActive) - 1 + "");
  }else{
    setTabActive(parseInt("0"))
  }
};
const next = (e) => {
  e.preventDefault()
  setTabActive(parseInt(tabActive) + 1 + "");
}

const handleChangeTab = (key) => {
  setTabActive(key)
}

const handleSubmit = async(e) => {
  e.preventDefault();
  const {datos_pasajeros, datos_contacto} = reserva;
  if(datos_pasajeros.nombre.trim().length < 3 || datos_pasajeros.apellido1.trim().length < 3 || datos_pasajeros.apellido2.trim().length < 3 ||
    datos_pasajeros.dni.trim().length > 9 || datos_contacto.contacto_email.trim().length < 5 || datos_contacto.contacto_telefono.trim().length < 8){
    dispatch(setError("Todos los campos son obligatorios. Revise los datos introducidos"))
  }else{
    dispatch(removeError());
    setTabActive(parseInt(tabActive) + 1 + "");
  }
}




  return (
    <div className="reservaContainer">
      <div className="sectionCabecera">
        <InfoCabecera vuelo={vuelo} />
      </div>
     
      <div className="sectionBody">
        <div className="sectionIzq">
                <Tabs activeKey={tabActive}  onChange={handleChangeTab} >
                  <TabPane tab="Datos pasajeros" key="1"  >
                    <form className="form-reserva-container" onSubmit={handleSubmit}>
                      <Pasajeros reserva={reserva} setReserva={setReserva}/>
                      <DatosContacto reserva={reserva} setReserva={setReserva} />
                      <div className="botons-tabs">
                        <input type="submit" className="process-tab-next" value="Continuar"/>
                      </div>
                    </form>
                    
                  </TabPane>
                  <TabPane tab="Maletas y seguro"  key="2"  disabled={tabActive} > 
                     <FactEquipaje reserva={reserva} setReserva={setReserva} />
                     <SeguroEquipaje reserva={reserva} setReserva={setReserva} />
                     <div className="botons-tabs">
                        <input type="button" className="process-tab-prev" value="Atrás" disabled={tabActive === "1"} onClick={(e) => prev(e)}/>
                        <input type="button" className="process-tab-next" value="Continuar"  onClick={(e) => next(e)}/>
                    </div>
                  </TabPane>
                  <TabPane tab="Transporte" key="3" disabled={tabActive} >
                      <Transporte reserva={reserva} setReserva={setReserva}/>
                      <div className="botons-tabs">
                        <input type="button" className="process-tab-prev" value="Atrás" disabled={tabActive === "1"} onClick={(e) => prev(e)}/>
                        <input type="button" className="process-tab-next" value="Continuar"  onClick={(e) => next(e)}/>
                    </div>
                  </TabPane>
                  <TabPane tab="Realizar pago" key="4"  disabled={tabActive} >
                      <VueloPasarela reserva={reserva} datos_facturacion={datos_facturacion} setDatosFacturacion={setDatosFacturacion}/>
                      <div className="botons-tabs">
                        <input type="button" className="process-tab-prev" value="Atrás" disabled={tabActive === "1"} onClick={(e) => prev(e)}/>
                    </div>
                  </TabPane>
                </Tabs> 
                {tabActive !== "4" &&
                <div className="sectionInfo">
                  <InfoVuelo reserva={reserva} />
                </div>
              }
                {msgError && <span className="errorMessages">{msgError}</span>}
            
            
        </div>   
       
      </div>
    </div>

  
  );
};
