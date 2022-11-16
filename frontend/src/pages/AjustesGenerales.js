/* React */
import React from "react";

/* Componets */
import Ajustes from "../components/Ajustes";

const AjustesGenerales = (props) => {
  return (
    <React.Fragment>
      <Ajustes is_superuser={props.is_superuser} />
      <div className="content">
        <div className="text-center">
          <h1 className="text-center">
            <span className="text-danger">AJUSTES</span> GENERALES
          </h1>
          <h2>Próximamente...</h2>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AjustesGenerales;
