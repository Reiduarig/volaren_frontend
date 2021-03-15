
import React from "react";
import { NavLink } from "react-router-dom";
import  DashboardRouter from "../../routers/DashboardRouter";

import "./dashboard.css";

const Dashboard = () => {


  return (
   
    <div id="dashboardPanel">
     
        
            <div className="optionsList">
              <ul>
                <li className="optionsListBox" id="historicalFly">
                  <NavLink activeClassName="active" to="/dashboard/historico"><span>Reservas</span></NavLink>
                </li>
                <li className="optionsListBox" id="documents">
                    <NavLink activeClassName="active" to="/dashboard/profile"><span>Perfil</span></NavLink>
                </li>
                <li className="optionsListBox" id="documents">
                    <NavLink activeClassName="active" to="/dashboard/datosFact"><span>Facturación</span></NavLink>
                </li>
                <li className="optionsListBox" id="documents">
                    <NavLink activeClassName="active" to="/dashboard/passwordReset"><span>Contraseña</span></NavLink>
                </li>
                <li className="optionsListBox" id="chat">
                    <NavLink activeClassName="active" to="/dashboard/chat"><span>Chat</span></NavLink>
                </li>
              </ul>
            </div>
            <div className="container-private">
              <DashboardRouter />
            </div>
     
    </div>
  
  );
};

export default Dashboard;
