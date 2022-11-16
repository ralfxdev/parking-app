/* React */
import React from "react";
import { Link } from "react-router-dom";

/* Styles */
import "./styles/NotFound.css";

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="page-wrap d-flex flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block text-danger">404</span>
              <div className="mb-4 lead">
                No se encontró la página que está buscando.
              </div>
              <Link to="/" className="btn btn-dark">
                Volver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
