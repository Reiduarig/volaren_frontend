import React, { useContext } from "react";
import "./AppStatus.css";
import waiting from "../assets/puff.svg";
import { AppContext } from '../context/AppContext'
import { useSelector } from "react-redux";

export const AppError = () => {
  const { error, setError } = useContext(AppContext);

  return (
    <>
      {error ? (
        <div className="app-error">
          <p>{error}</p> <button onClick={() => setError(null)}>X</button>
        </div>
      ) : null}
    </>
  );
}

export const AppWaiting = () => {
  const { loading } = useSelector(state => state.ui);
  return (
    <>
      {loading ? (
        <div className="app-waiting">
          <img src={waiting} alt="Cargando..." />
        </div>
      ) : null}
    </>
  );
}

