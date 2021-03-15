import './Loading.css';
import waiting from "../../assets/puff.svg";
export const Loading = () => {
   
    return (
          <div style={{minHeight:'450'}} className="app-waiting">
            <img src={waiting} alt="Cargando..." />
          </div>
    );
  }
  