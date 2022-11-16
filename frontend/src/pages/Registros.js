/* React */
import React from "react";

/* Componets */
import TablaRegistros from "../components/registros/TablaRegistros";

const Registros = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">
              <span className="text-danger">MÓDULO</span> REGISTROS
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <TablaRegistros />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Registros;
