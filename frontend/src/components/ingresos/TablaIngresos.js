/* Recat */
import React from "react";
import { Link } from "react-router-dom";

/* Context */
import { Context } from "../../context/Context";

/* Services */
import { getData, putData, postData } from "../../services/Api";

const TablaIngresos = () => {
  /* Datos de los vehiculos */
  const [vehiculos, setVehiculos] = React.useState([]);
  const [id, setId] = React.useState("");
  const [placa, setPlaca] = React.useState("");
  const [marca, setMarca] = React.useState("");
  const [modelo, setModelo] = React.useState("");
  const [color, setColor] = React.useState("");

  /* Datos del cliente */
  const [cliente_id, setCliente_id] = React.useState("");

  /* Datos de la tarifa */
  const [tarifa_id, setTarifa_id] = React.useState("");

  /* Utils */
  const [loading, setLoading] = React.useState(true);
  const [detail, setDetail] = React.useState("");
  const [showDetail, setShowDetail] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showError, setShowError] = React.useState(true);
  const [busqueda, setBusqueda] = React.useState("");

  /* Context */
  const { onChange, setOnChange } = React.useContext(Context);

  const getVehiculos = () => {
    getData("vehiculos/")
      .then((data) => {
        setVehiculos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDataRegistro = (
    id,
    placa,
    marca,
    modelo,
    color,
    cliente_id,
    tarifa_id
  ) => {
    setId(id);
    setPlaca(placa);
    setMarca(marca);
    setModelo(modelo);
    setColor(color);
    setCliente_id(cliente_id);
    setTarifa_id(tarifa_id);
  };

  const postIngreso = () => {
    postData("registros/", {
      vehiculo_id: id,
    })
      .then((data) => {
        setOnChange((prevState) => !prevState);
        setDetail("El vehículo se registró correctamente");
        setShowDetail(true);
      })
      .catch((error) => {
        console.log(error);
        setError("No se pudo registrar el vehículo");
        setShowError(true);
      });

    putData(`vehiculos/${id}/`, {
      placa: placa,
      marca: marca,
      modelo: modelo,
      color: color,
      vehiculo_status: false,
      cliente_id: cliente_id,
      tarifa_id: tarifa_id,
    })
      .then((data) => {
        setOnChange((prevState) => !prevState);
        setShowDetail(true);
      })
      .catch((error) => {
        console.log(error);
        setError("No se pudo registrar el vehículo");
        setShowError(true);
      });
  };

  const handleClose = () => {
    setShowDetail(false);
    setShowError(false);
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  React.useEffect(() => {
    getVehiculos();
  }, [onChange]);

  return (
    <div className="container pt-4">
      <div className="row justify-content-center mt-3 mb-3">
        <div className="col-md-6">
          <form>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Búsqueda por placa, cliente o tarifa"
                value={busqueda}
                onChange={handleBusqueda}
              />
              <button
                className="input-group-text btn-success"
                disabled="disabled"
              >
                <i className="bi bi-search me-2"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>Listado General</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Placa</th>
                      <th>Cliente</th>
                      <th>Tarifa</th>
                      <th>Precio</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="text-center">
                          <div
                            className="spinner-border text-dark"
                            role="status"
                          ></div>
                          <p className="text-center">Cargando...</p>
                        </td>
                      </tr>
                    ) : (
                      vehiculos
                        .filter((vehiculo) => {
                          return (
                            vehiculo.placa
                              .toLocaleLowerCase()
                              .includes(busqueda.toLocaleLowerCase()) ||
                            vehiculo.cliente.nombre_completo
                              .toLocaleLowerCase()
                              .includes(busqueda.toLocaleLowerCase()) ||
                            vehiculo.tarifa.nombre
                              .toLocaleLowerCase()
                              .includes(busqueda.toLocaleLowerCase())
                          );
                        })
                        .map((vehiculo, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{vehiculo.placa}</td>
                            <td>{vehiculo.cliente.nombre_completo}</td>
                            <td>{vehiculo.tarifa.nombre}</td>
                            <td>Q. {vehiculo.tarifa.precio} x min</td>
                            {vehiculo.vehiculo_status === true ? (
                              <td>
                                <span className="badge bg-secondary">
                                  Sin Estacionar
                                </span>
                              </td>
                            ) : (
                              <td>
                                <span className="badge bg-success">
                                  Estacionado
                                </span>
                              </td>
                            )}
                            <td>
                              {vehiculo.vehiculo_status === true ? (
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modal-ingresar-vehiculo"
                                  onClick={() =>
                                    handleDataRegistro(
                                      vehiculo.id,
                                      vehiculo.placa,
                                      vehiculo.marca,
                                      vehiculo.modelo,
                                      vehiculo.color,
                                      vehiculo.cliente.id,
                                      vehiculo.tarifa.id
                                    )
                                  }
                                >
                                  Ingresar
                                </button>
                              ) : (
                                <Link className="nav-link" to="/salidas">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                  >
                                    Salida
                                  </button>
                                </Link>
                              )}
                              <div
                                className="modal fade"
                                id="modal-ingresar-vehiculo"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                aria-labelledby="staticBackdropLabel"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog modal-dialog-centered">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id="staticBackdropLabel"
                                      >
                                        ¿Desea{" "}
                                        <strong className="text-bold">
                                          Ingresar
                                        </strong>{" "}
                                        el vehículo?
                                      </h5>
                                    </div>
                                    {showError && error && (
                                      <div
                                        className="alert alert-danger"
                                        role="alert"
                                      >
                                        {error}
                                      </div>
                                    )}
                                    {showDetail && detail && (
                                      <div
                                        className="alert alert-success"
                                        role="alert"
                                      >
                                        {detail}
                                      </div>
                                    )}
                                    <div className="modal-body">
                                      El vehículo será ingresado al
                                      estacionamiento
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-danger"
                                        data-bs-dismiss="modal"
                                        onClick={() => handleClose()}
                                      >
                                        Cerrar
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-dark"
                                        onClick={postIngreso}
                                      >
                                        Ingresar
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                    )}
                    {!loading && vehiculos.length === 0 && (
                      <tr>
                        <td colSpan="7">No hay vehículos registrados</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaIngresos;
