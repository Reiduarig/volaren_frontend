import React from "react";
import { Switch, Route } from "react-router-dom";
import { Profile } from "../components/profile/Profile";
import { VueloPasarela } from "../components/vuelos/reserva/VueloPasarela";
import { Historico } from "../components/vuelos/historico/Historico";
import { Documents } from "../components/documentos/Documents";
import { DatosFact } from "../components/profile/components/DatosFact";
import { ReservaInfo } from "../components/vuelos/historico/ReservaInfo";
import { NotFoundPage } from "../components/notFoundPage/NotFoundPage";

import { Pdf } from "../components/pdf/Pdf";
import { CambiarPassword } from "../components/profile/components/CambiarPassword";
import { RedirectReserva } from "../components/vuelos/reserva/RedirectReserva";
import { Chat } from "../pages/chat/Chat";

const DashboardRouter = () => {


  return (
    
     
          <Switch>
            <Route exact path="/dashboard" component={Historico}/>
            <Route exact path="/dashboard/profile" component={Profile} />
            <Route exact path="/dashboard/datosFact" component={DatosFact} />
            <Route exact path="/dashboard/passwordReset" component={CambiarPassword} />
            
            <Route exact path="/dashboard/historico" component={Historico} />
            <Route exact path="/dashboard/historico/reserva/:id" component={ReservaInfo}/>
            <Route exact path="/dashboard/historico/documents/:id" component={Documents} />
           
            <Route exact path="/dashboard/pdf" component={Pdf} />

            <Route exact path="/dashboard/vuelo/pago" component={VueloPasarela} />
            <Route exact path="/dashboard/reserva/redirectReserva" component={RedirectReserva}/>
            <Route exact path="/dashboard/chat" component={Chat}/>
            <Route component={NotFoundPage} />
          </Switch>
   
  );
};

export default DashboardRouter;