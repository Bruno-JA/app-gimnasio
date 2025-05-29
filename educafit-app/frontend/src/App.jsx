import { useEffect, useState } from "react";
import Login from "./components/Login";
import Registro from "./components/Registro";
import BarraNavegacion from "./components/BarraNavegacion";
import CalendarioEntrenamiento from "./components/CalendarioEntrenamiento";
import Educafit from "./components/Educafit";
import Herramientas from "./components/Herramientas";
import Usuario from "./components/Usuario";
import "./main.css";

function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [vistaActual, setVistaActual] = useState("inicio");

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
              <button onClick={() => setMostrarRegistro(false)}>Iniciar sesión</button>
            </div>
          </>
        ) : (
          <>
            <Login alIniciarSesion={setUsuarioAutenticado} />
            <div className="cambio-formulario">
              <span>¿No tienes cuenta?</span>
              <button onClick={() => setMostrarRegistro(true)}>Registrarse</button>
            </div>
          </>
        )}
      </div>
    );
  }

  const renderizarContenido = () => {
    switch (vistaActual) {
      case "inicio":
        return <CalendarioEntrenamiento />;
      case "educafit":
        return <Educafit />;
      case "herramientas":
        return <Herramientas />;
      case "usuario":
        return <Usuario cerrarSesion={cerrarSesion} usuario={usuarioAutenticado} />;
      default:
        return <p>Vista no válida</p>;
    }
  };

  return (
    <>
      <BarraNavegacion setVista={setVistaActual} />
      <div className="contenedor-pagina">
        {renderizarContenido()}
      </div>
    </>
  );
}

export default App;
