import React from "react";

/* Context */
import { Context } from "../../context/Context";

/* Services */
import { postData } from "../../services/Api";

const ModalCrearTarifas = () => {
  /* Datos de la tarifa */
  const [nombre, setNombre] = React.useState("");
  const [precio, setPrecio] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");

  /* Utils */
  const [detail, setDetail] = React.useState("");
  const [showDetail, setShowDetail] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showError, setShowError] = React.useState(true);

  /* Context */
  const { setOnChange } = React.useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    postData("tarifas/", {
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
        setError("Error al crear la tarifa");
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
          data-bs-target="#modal-crear-tarifa"
        >
          Nueva Tarifa
        </button>

        <div
          className="modal fade hide.bs.modal"
          id="modal-crear-tarifa"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Nueva Tarifa
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
                        onChange={(e) => setNombre(e.target.value)}
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
                        onChange={(e) => setPrecio(e.target.value)}
                      />
                      <label>Precio</label>
                    </div>
                    <div className="form-floating">
                      <textarea
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        required
                        onChange={(e) => setDescripcion(e.target.value)}
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

export default ModalCrearTarifas;
