import React from "react";

/* Componets */
import TablaVehiculos from "../components/vehiculos/TablaVehiculos";
import ModalCrearVehiculos from "../components/vehiculos/ModalCrearVehiculos";

const Vehiculos = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">
              <span className="text-danger">MÓDULO</span> VEHÍCULOS
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ModalCrearVehiculos />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <TablaVehiculos />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Vehiculos;
