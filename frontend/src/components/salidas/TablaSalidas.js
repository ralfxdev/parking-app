import React from "react";

/* Context */
import { Context } from "../../context/Context";

/* Services */
import { getData, putData } from "../../services/Api";

const TablaSalidas = () => {
  /* Datos de los registros */
  const [registros, setRegistros] = React.useState([]);
  const [id, setId] = React.useState("");

  /* Datos de los vehiculos */
  const [vehiculo_id, setVehiculoId] = React.useState("");
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

  const getRegistros = () => {
    getData("registros/")
      .then((data) => {
        setRegistros(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDataRegistro = (
    id,
    vehiculo_id,
    placa,
    marca,
    modelo,
    color,
    cliente_id,
    tarifa_id
  ) => {
    setId(id);
    setVehiculoId(vehiculo_id);
    setPlaca(placa);
    setMarca(marca);
    setModelo(modelo);
    setColor(color);
    setCliente_id(cliente_id);
    setTarifa_id(tarifa_id);
  };

  const handleSalida = () => {
    putData(`registros/${id}/`, {
      vehiculo_id: vehiculo_id,
      fecha_salida: new Date(),
      pago_status: true,
    })
      .then((data) => {
        getRegistros();
        setOnChange((prevState) => !prevState);
        setDetail("El vehículo puede abandonar el estacionamiento");
        setShowDetail(true);
      })
      .catch((error) => {
        console.log(error);
        setError("Error al intentar salir");
        setShowError(true);
      });

    putData(`vehiculos/${vehiculo_id}/`, {
      placa: placa,
      marca: marca,
      modelo: modelo,
      color: color,
      vehiculo_status: true,
      cliente_id: cliente_id,
      tarifa_id: tarifa_id,
    })
      .then((data) => {
        getRegistros();
        setOnChange((prevState) => !prevState);
      })
      .catch((error) => {
        console.log(error);
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
    getRegistros();
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
              <h4>Listado de Registros</h4>
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
                      <th>Fecha de Ingreso</th>
                      <th>Fecha de Salida</th>
                      <th>Tiempo</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="11" className="text-center">
                          <div
                            className="spinner-border text-dark"
                            role="status"
                          ></div>
                          <p className="text-center">Cargando...</p>
                        </td>
                      </tr>
                    ) : (
                      registros
                        .filter(
                          (registro) =>
                            registro.vehiculo.vehiculo_status === false &&
                            registro.pago_status === false &&
                            (registro.vehiculo.placa
                              .toLocaleLowerCase()
                              .includes(busqueda.toLocaleLowerCase()) ||
                              registro.vehiculo.cliente.nombre_completo
                                .toLocaleLowerCase()
                                .includes(busqueda.toLocaleLowerCase()) ||
                              registro.vehiculo.tarifa.nombre
                                .toLocaleLowerCase()
                                .includes(busqueda.toLocaleLowerCase()))
                        )
                        .map((registro, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{registro.vehiculo.placa}</td>
                            <td>{registro.vehiculo.cliente.nombre_completo}</td>
                            <td>{registro.vehiculo.tarifa.nombre}</td>
                            <td>Q. {registro.vehiculo.tarifa.precio} x min</td>
                            <td>{registro.fecha_ingreso}</td>
                            <td>{registro.fecha_salida}</td>
                            <td>{registro.tiempo_total}</td>
                            {registro.total_pagar === null ? (
                              <td>{registro.total_pagar}</td>
                            ) : (
                              <td>Q. {registro.total_pagar}</td>
                            )}
                            {registro.pago_status === true ||
                            registro.vehiculo.tarifa.nombre === "Oficiales" ? (
                              <td>
                                <span className="badge bg-success">Pagado</span>
                              </td>
                            ) : (
                              <td>
                                <span className="badge bg-secondary">
                                  Pendiente
                                </span>
                              </td>
                            )}
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-salida-vehiculo"
                                onClick={() =>
                                  handleDataRegistro(
                                    registro.id,
                                    registro.vehiculo.id,
                                    registro.vehiculo.placa,
                                    registro.vehiculo.marca,
                                    registro.vehiculo.modelo,
                                    registro.vehiculo.color,
                                    registro.vehiculo.cliente.id,
                                    registro.vehiculo.tarifa.id
                                  )
                                }
                              >
                                Salida
                              </button>
                            </td>
                          </tr>
                        ))
                    )}
                    {!loading && registros.length === 0 && (
                      <tr>
                        <td colSpan="11">No hay vehículos estacionados</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="modal-salida-vehiculo"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                ¿Desea dar <strong className="text-bold">Salida</strong> al
                vehículo?
              </h5>
            </div>
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
            <div className="modal-body">
              Se realizará el cobro de la tarifa del vehículo y podrá salir
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleSalida}
              >
                Salida
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaSalidas;
