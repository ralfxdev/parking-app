import React from "react";

/* Context */
import { Context } from "../../context/Context";

/* Services */
import { getData } from "../../services/Api";

const TablaRegistros = () => {
  /* Datos de los vehiculos */
  const [registros, setRegistros] = React.useState([]);

  /* Utils */
  const [loading, setLoading] = React.useState(true);
  const [busqueda, setBusqueda] = React.useState("");

  /* Context */
  const { onChange } = React.useContext(Context);

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

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  React.useEffect(() => {
    getRegistros();
  }, [onChange]);

  return (
    <div className="container pt-4">
      <div className="container pt-4">
        <div className="row justify-content-center mb-3">
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
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="10" className="text-center">
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
                            registro.pago_status === true &&
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
                          </tr>
                        ))
                    )}
                    {!loading && registros.length === 0 && (
                      <tr>
                        <td colSpan="10">No hay vehículos registrados</td>
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

export default TablaRegistros;
