import { useEffect, useState } from "react";
import Login from "./components/Login";
import Registro from "./components/Registro";
import "./main.css"; // Asegúrate de importar tu CSS global
import CalendarioEntrenamiento from "./components/CalendarioEntrenamiento";

function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  useEffect(() => {
    const datosGuardados = localStorage.getItem("usuario");
    if (datosGuardados) {
      setUsuarioAutenticado(JSON.parse(datosGuardados));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuarioAutenticado(null);
  };

  if (!usuarioAutenticado) {
    return (
      <div className="contenedor-formulario">
        {mostrarRegistro ? (
          <>
            <Registro />
            <div className="cambio-formulario">
              <span>¿Ya tienes cuenta?</span>
              <button onClick={() => setMostrarRegistro(false)}>
                Iniciar sesión
              </button>
            </div>
          </>
        ) : (
          <>
            <Login alIniciarSesion={setUsuarioAutenticado} />
            <div className="cambio-formulario">
              <span>¿No tienes cuenta?</span>
              <button onClick={() => setMostrarRegistro(true)}>
                Registrarse
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
  <>
      <div className="contenedor-formulario">
        <h1>Bienvenido, {usuarioAutenticado.nombre}</h1>
        <p>Tu usuario es: {usuarioAutenticado.nombre_usuario}</p>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
        {/* Aquí irá el resto de tu aplicación */}
      </div>
      <CalendarioEntrenamiento />
      </>
  );
}

export default App;
