import React from "react";

/* Context */
import { Context } from "../../context/Context";

/* Services */
import { getData, deleteData, putData } from "../../services/Api";

const TablaTarifas = () => {
  /* Datos de la tarifa */
  const [tarifas, setTarifas] = React.useState([]);
  const [id, setId] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [precio, setPrecio] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");

  /* Utils */
  const [loading, setLoading] = React.useState(true);
  const [detail, setDetail] = React.useState("");
  const [showDetail, setShowDetail] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showError, setShowError] = React.useState(true);

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

  const handleDelete = () => {
    deleteData(`tarifas/${id}`)
      .then(() => {
        setOnChange(!onChange);
        getTarifas();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    getData(`tarifas/${id}/`)
      .then((data) => {
        setNombre(data.nombre);
        setPrecio(data.precio);
        setDescripcion(data.descripcion);
        setId(data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    tarifas.map(async (tarifa) => {
      if (tarifa.id === id) {
        await putData(`tarifas/${id}/`, {
          nombre,
          precio,
          descripcion,
        })
          .then((data) => {
            setDetail(data.detail);
            setOnChange((prevState) => !prevState);
            setShowDetail(true);
          })
          .catch((error) => {
            console.log(error);
            setShowError(true);
            setError("Error al editar la tarifa");
          });
      }
    });
  };

  const handleClose = () => {
    setShowDetail(false);
    setShowError(false);
  };

  React.useEffect(() => {
    getTarifas();
  }, [onChange]);

  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>Tarifas Disponibles</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Descripción</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          <div
                            className="spinner-border text-dark"
                            role="status"
                          ></div>
                          <p className="text-center">Cargando...</p>
                        </td>
                      </tr>
                    ) : (
                      tarifas.map((tarifa, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{tarifa.nombre}</td>
                          <td>Q. {tarifa.precio} x min</td>
                          <td>{tarifa.descripcion}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-dark"
                              data-bs-toggle="modal"
                              data-bs-target="#modal-editar-tarifa"
                              onClick={() => handleEdit(tarifa.id)}
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <div
                              className="modal fade hide.bs.modal"
                              id="modal-editar-tarifa"
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
                                      Editar Tarifa
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
                                            value={nombre}
                                            onChange={(e) =>
                                              setNombre(e.target.value)
                                            }
                                          />
                                          <label>Nombre</label>
                                        </div>
                                        <div className="form-floating">
                                          <input
                                            type="number"
                                            step="any"
                                            className="form-control"
                                            id="floatingInput"
                                            required
                                            value={precio}
                                            onChange={(e) =>
                                              setPrecio(e.target.value)
                                            }
                                          />
                                          <label>Precio</label>
                                        </div>
                                        <div className="form-floating">
                                          <textarea
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            required
                                            value={descripcion}
                                            onChange={(e) =>
                                              setDescripcion(e.target.value)
                                            }
                                          />
                                          <label>Descripción</label>
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
                              data-bs-target="#modal-eliminar-tarifa"
                              onClick={() => handleEdit(tarifa.id)}
                            >
                              <i className="bi bi-trash-fill"></i>
                            </button>

                            <div
                              className="modal fade"
                              id="modal-eliminar-tarifa"
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
                                      la tarifa?
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
                    {!loading && tarifas.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No hay tarifas disponibles
                        </td>
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

export default TablaTarifas;
