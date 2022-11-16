import React from "react";

/* Componets */
import TablaClientes from "../components/clientes/TablaClientes";
import ModalCrearClientes from "../components/clientes/ModalCrearClientes";

const Clientes = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">
              <span className="text-danger">MÓDULO</span> CLIENTES
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ModalCrearClientes />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <TablaClientes />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Clientes;
