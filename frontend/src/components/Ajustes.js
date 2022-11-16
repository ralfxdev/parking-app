/* React */
import React from "react";
import { Link } from "react-router-dom";

/* Styles */
import "./styles/Ajustes.css";

const Ajustes = (props) => {
  if (props.is_superuser === true) {
    return (
      <React.Fragment>
        <div className="sidebar">
          <Link className="nav-link" to="/ajustes/generales">
            <i className="bi bi-gear-fill me-2"></i>
            Generales
          </Link>
          <Link className="nav-link" to="/ajustes/cuenta">
            <i className="bi bi-person-circle me-2"></i>
            Cuenta
          </Link>
          <Link className="nav-link" to="/ajustes/usuarios">
            <i className="bi bi-people-fill me-2"></i>
            Usuarios
          </Link>
          <Link className="nav-link" to="/ajustes/register">
            <i className="bi bi-person-plus-fill me-2"></i>
            Crear Usuario
          </Link>
          <Link className="nav-link" to="/ajustes/tarifas">
            <i className="bi bi-cash me-2"></i>
            Tarifas
          </Link>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="sidebar">
          <Link className="nav-link" to="/ajustes/cuenta">
            <i className="bi bi-person-circle me-2"></i>
            Cuenta
          </Link>
        </div>
      </React.Fragment>
    );
  }
};

export default Ajustes;
