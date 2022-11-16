/* React */
import React from "react";

/* Components */
import Ajustes from "../components/Ajustes";

/* Services */
import { postData } from "../services/Api";

/* Styles */
import "./styles/FormUser.css";

const Register = (props) => {
  /* Datos del usuario */
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [is_superuser, setIsSuperuser] = React.useState(false);

  /* Utils */
  const [mesage, setMesage] = React.useState("");
  const [error, setError] = React.useState("");

  /**
   * Cuando el usuario envíe el formulario, manda los datos a la ruta register,
   * y responde con el mensaje 'Usuario creado correctamente'.
   * Si el servidor devuelve un error, lo mostrará en pantalla.
   */

  const handleSubmit = async (event) => {
    event.preventDefault();

    postData("usuarios/register", {
      name,
      username,
      email,
      password,
      is_superuser,
    }).then((data) => {
      if (data.id) {
        setMesage("Usuario creado correctamente");
      } else {
        setError(data.username || data.email);
      }
    });
  };

  return (
    <React.Fragment>
      <Ajustes is_superuser={props.is_superuser} />
      <div className="content">
        <div className="form-signin m-auto text-center">
          <form onSubmit={handleSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="57"
              fill="currentColor"
              className="bi bi-people-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
              <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
            </svg>
            <h1 className="text-center h2 mb-3">
              <span className="text-danger">CREAR</span> USUARIO
            </h1>

            {mesage && (
              <div className="alert alert-success" role="alert">
                {mesage}
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <label>Nombre</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Username</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Correo Elecntrónico</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Contraseña</label>
            </div>
            <div className="form-check form-switch pb-2">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={(e) => setIsSuperuser(e.target.checked)}
              />
              <label className="form-check-label">
                Permisos de administrador
              </label>
            </div>
            <button className="w-100 btn btn-lg btn-dark" type="submit">
              Crear
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
