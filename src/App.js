import React from "react";
import { Provider } from "react-redux";
import { Router } from "./routers/Router";
import { store } from "./store/store";

import "./App.css";

export const App = () => {
  
 
  return (
    <Provider store={store}>
          <Router />
    </Provider>
  );
};
