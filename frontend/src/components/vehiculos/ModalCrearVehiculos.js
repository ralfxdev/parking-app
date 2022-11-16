import React from "react";

/* Context */
import { Context } from "../../context/Context";

/* Services */
import { postData, getData } from "../../services/Api";

const ModalCrearVehiculos = () => {
  /* Datos del vehículo */
  const [placa, setPlaca] = React.useState("");
  const [marca, setMarca] = React.useState("");
  const [modelo, setModelo] = React.useState("");
  const [color, setColor] = React.useState("");

  /* Datos del cliente */
  const [clientes, setClientes] = React.useState([]);
  const [cliente_id, setCliente_id] = React.useState("");

  /* Datos de la tarifa */
  const [tarifas, setTarifas] = React.useState([]);
  const [tarifa_id, setTarifa_id] = React.useState("");

  /* Utils */
  const [detail, setDetail] = React.useState("");
  const [showDetail, setShowDetail] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showError, setShowError] = React.useState(true);

  /* Context */
  const { setOnChange } = React.useContext(Context);

  const getTarifas = () => {
    getData("tarifas/")
      .then((data) => {
        setTarifas(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getClientes = () => {
    getData("clientes/")
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getInfo = () => {
    getTarifas();
    getClientes();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData("vehiculos/", {
      placa: placa,
      marca: marca,
      modelo: modelo,
      color: color,
      vehiculo_status: true,
      cliente_id: cliente_id,
      tarifa_id: tarifa_id,
    })
      .then((data) => {
        setDetail(data.detail);
        setOnChange((prevState) => !prevState);
        setShowDetail(true);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setShowError(true);
        setError("Error al crear el vehículo");
      });
    document.getElementById("form").reset();
  };

  const handleClose = () => {
    setShowDetail(false);
    setShowError(false);
  };

  return (
    <React.Fragment>
      <div className="container text-center pt-4">
        <button
          type="button"
          className="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#modal-crear-vehiculo"
          onClick={getInfo}
        >
          Nuevo Vehículo
        </button>

        <div
          className="modal fade hide.bs.modal"
          id="modal-crear-vehiculo"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Nuevo Vehículo
                </h5>
              </div>
              <div className="modal-body">
                <form id="form" onSubmit={handleSubmit}>
                  {showError && error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  {showDetail && detail && (
                    <div className="alert alert-success" role="alert">
                      {detail}
                    </div>
                  )}

                  <div className="form-group">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        required
                        onChange={(e) => setPlaca(e.target.value)}
                      />
                      <label>Placa</label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        required
                        onChange={(e) => setMarca(e.target.value)}
                      />
                      <label>Marca</label>
                    </div>

                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        required
                        onChange={(e) => setModelo(e.target.value)}
                      />
                      <label>Modelo</label>
                    </div>

                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        required
                        onChange={(e) => setColor(e.target.value)}
                      />
                      <label>Color</label>
                    </div>

                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        required
                        onChange={(e) => setCliente_id(e.target.value)}
                      >
                        <option value="">Seleccione un cliente</option>
                        {clientes.map((cliente) => (
                          <option key={cliente.id} value={cliente.id}>
                            {cliente.nombre_completo}
                          </option>
                        ))}
                      </select>
                      <label>Clientes</label>
                    </div>
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        required
                        onChange={(e) => setTarifa_id(e.target.value)}
                      >
                        <option value="">Seleccione una tarifa</option>
                        {tarifas.map((tarifa) => (
                          <option key={tarifa.id} value={tarifa.id}>
                            {tarifa.nombre}
                          </option>
                        ))}
                      </select>
                      <label>Tarifas</label>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleClose}
                      data-bs-dismiss="modal"
                    >
                      Cerrar
                    </button>
                    <button type="submit" className="btn btn-dark">
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalCrearVehiculos;
