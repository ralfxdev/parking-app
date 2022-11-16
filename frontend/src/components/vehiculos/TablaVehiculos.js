/* React */
import React from "react";

/* Context */
import { Context } from "../../context/Context";

/* Services */
import { getData, deleteData, putData } from "../../services/Api";

const TablaVehiculos = () => {
  /* Datos de los vehiculos */
  const [vehiculos, setVehiculos] = React.useState([]);
  const [id, setId] = React.useState("");
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
  const [loading, setLoading] = React.useState(true);
  const [detail, setDetail] = React.useState("");
  const [showDetail, setShowDetail] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showError, setShowError] = React.useState(true);
  const [busqueda, setBusqueda] = React.useState("");

  /* Context */
  const { onChange, setOnChange } = React.useContext(Context);

  const getTarifas = () => {
    getData("tarifas/")
      .then((data) => {
        setTarifas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getClientes = () => {
    getData("clientes/")
      .then((data) => {
        setClientes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleDelete = () => {
    deleteData(`vehiculos/${id}`)
      .then(() => {
        setOnChange(!onChange);
        getVehiculos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    getData(`vehiculos/${id}/`)
      .then((data) => {
        setId(data.id);
        setPlaca(data.placa);
        setMarca(data.marca);
        setModelo(data.modelo);
        setColor(data.color);
        setCliente_id(data.cliente_id);
        setTarifa_id(data.tarifa_id);
        getClientes();
        getTarifas();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    vehiculos.map(async (vehiculo) => {
      if (vehiculo.id === id) {
        await putData(`vehiculos/${id}/`, {
          placa,
          marca,
          modelo,
          color,
          vehiculo_status: true,
          cliente_id,
          tarifa_id,
        })
          .then((data) => {
            setDetail(data.detail);
            setOnChange((prevState) => !prevState);
            setShowDetail(true);
          })
          .catch((error) => {
            console.log(error);
            setShowError(true);
            setError("Error al editar el vehículo");
          });
      }
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
              <h4>Listado de Vehículos</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Placa</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Color</th>
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
                        <td colSpan="10" className="text-center">
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
                            <td>{vehiculo.marca}</td>
                            <td>{vehiculo.modelo}</td>
                            <td>{vehiculo.color}</td>
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
                              <button
                                type="button"
                                className="btn btn-dark"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-editar-vehiculo"
                                onClick={() => handleEdit(vehiculo.id)}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <div
                                className="modal fade hide.bs.modal"
                                id="modal-editar-vehiculo"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                aria-labelledby="staticBackdropLabel"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog modal-dialog-centered ">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id="staticBackdropLabel"
                                      >
                                        Editar Vehículo
                                      </h5>
                                    </div>
                                    <div className="modal-body">
                                      <form id="form" onSubmit={handleSubmit}>
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

                                        <div className="form-group">
                                          <div className="form-floating">
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="floatingInput"
                                              required
                                              value={placa}
                                              onChange={(e) =>
                                                setPlaca(e.target.value)
                                              }
                                            />
                                            <label>Placa</label>
                                          </div>
                                          <div className="form-floating">
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="floatingInput"
                                              required
                                              value={marca}
                                              onChange={(e) =>
                                                setMarca(e.target.value)
                                              }
                                            />
                                            <label>Marca</label>
                                          </div>

                                          <div className="form-floating">
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="floatingInput"
                                              required
                                              value={modelo}
                                              onChange={(e) =>
                                                setModelo(e.target.value)
                                              }
                                            />
                                            <label>Modelo</label>
                                          </div>

                                          <div className="form-floating">
                                            <select
                                              className="form-select"
                                              id="floatingSelect"
                                              aria-label="Floating label select example"
                                              required
                                              onChange={(e) =>
                                                setCliente_id(e.target.value)
                                              }
                                            >
                                              <option value="">
                                                Seleccione un cliente
                                              </option>
                                              {clientes.map((cliente) => (
                                                <option
                                                  key={cliente.id}
                                                  value={cliente.id}
                                                >
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
                                              onChange={(e) =>
                                                setTarifa_id(e.target.value)
                                              }
                                            >
                                              <option value="">
                                                Seleccione una tarifa
                                              </option>
                                              {tarifas.map((tarifa) => (
                                                <option
                                                  key={tarifa.id}
                                                  value={tarifa.id}
                                                >
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
                                          <button
                                            type="submit"
                                            className="btn btn-dark"
                                          >
                                            Guardar
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-eliminar-vehiculo"
                                onClick={() => handleEdit(vehiculo.id)}
                              >
                                <i className="bi bi-trash-fill"></i>
                              </button>

                              <div
                                className="modal fade"
                                id="modal-eliminar-vehiculo"
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
                                        <strong className="text-danger">
                                          Borrar
                                        </strong>{" "}
                                        el cliente?
                                      </h5>
                                    </div>
                                    <div className="modal-body">
                                      Todos los datos serán eliminados.
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-dark"
                                        data-bs-dismiss="modal"
                                      >
                                        Cerrar
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-danger"
                                        data-bs-dismiss="modal"
                                        onClick={handleDelete}
                                      >
                                        Borrar
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

export default TablaVehiculos;
