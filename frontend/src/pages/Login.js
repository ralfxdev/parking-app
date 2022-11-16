/* React */
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

/* Services */
import { postData } from "../services/Api";

/* Styles */
import "./styles/FormUser.css";

const Login = () => {
  /* Datos del usuario. */
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  /* Utils */
  const [navigate, setNavigate] = React.useState(false);
  const [error, setError] = React.useState("");

  /**
   * Cuando el usuario envía el formulario,  envía el correo electrónico y la contraseña a
   * el servidor, y si el servidor devuelve un JWT, establezca el set navigate en verdadero,
   * de lo contrario, establezca el estado de error en el mensaje de error devuelto por el servidor.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    postData("usuarios/login", {
      email,
      password,
    }).then((data) => {
      if (data.jwt) {
        setNavigate(true);
        window.location.reload();
      } else {
        setError(data.detail);
      }
    });
  };

  useEffect(() => {
    if (navigate) {
      <Navigate to="/" />;
    }
  }, [navigate]);

  return (
    <React.Fragment>
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
          <h1 className="h3 mb-3 fw-normal">Iniciar Sesión</h1>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Correo Electrónico</label>
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
          <button className="w-100 btn btn-lg btn-dark" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
