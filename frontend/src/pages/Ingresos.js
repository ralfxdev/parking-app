/* React */
import React from "react";

/* Componets */
import TablaIngresos from "../components/ingresos/TablaIngresos";
import ModalCrearVehiculos from "../components/vehiculos/ModalCrearVehiculos";
import ModalCrearClientes from "../components/clientes/ModalCrearClientes";

const Inicio = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">
              <span className="text-danger">PANEL</span> INGRESOS
            </h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-2">
            <ModalCrearVehiculos />
          </div>
          <div className="col-2">
            <ModalCrearClientes />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <TablaIngresos />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Inicio;
