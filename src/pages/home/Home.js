import React  from "react";
import { FliesSearch } from "../../components/flysearch/FliesSearch";
import { Recomendados } from "../../components/vuelos/recomendados/Recomendados";
import "./Home.css";
import { InfoCovid } from "./components/InfoCovid";
import { InfoComp } from "./components/InfoComp";
import { InfoBanner } from "./components/InfoBanner";


const Home = () => {
 

  return (
    <div id="section-srcHome">
      <FliesSearch /> 
      <InfoCovid />
      <Recomendados />
      <InfoComp />  
      <InfoBanner />
    </div>
  );
};

export default Home;