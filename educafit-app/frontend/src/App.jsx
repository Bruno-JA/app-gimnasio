import { useEffect, useState } from "react";
import Login from "./components/Login";
import Registro from "./components/Registro";
import BarraNavegacion from "./components/BarraNavegacion";
import CalendarioEntrenamiento from "./components/CalendarioEntrenamiento";
import Educafit from "./components/Educafit";
import Herramientas from "./components/Herramientas";
import PerfilUsuario from "./components/perfilUsuario";
import "./main.css";

function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [vistaActual, setVistaActual] = useState("inicio");

  /** Verifica que hay un usuario autenticado al cargar la aplicación */
  useEffect(() => {
  const datosGuardados = localStorage.getItem("usuario");
  if (datosGuardados) {
    setUsuarioAutenticado(JSON.parse(datosGuardados));
  }
}, []);


/** Cierra la sesión del usuario, eliminando los datos guardados en localStorage */
  const cerrarSesion = () => {
  if (!usuarioAutenticado) return; // Si no hay usuario autenticado, no hacemos nada
  // Confirmación antes de cerrar sesión
  const confirmacion = window.confirm("¿Estás seguro de que quieres cerrar sesión?");
  if (confirmacion) {
    localStorage.removeItem("usuario");
    setUsuarioAutenticado(null);
  }
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

  // dependiendo del valor en vistaActual, se renderiza un componente diferente represantando la pestaña actual seleccionada
  const renderizarContenido = () => {
    switch (vistaActual) {
      case "inicio":
        return <CalendarioEntrenamiento />;
      case "educafit":
        return <Educafit />;
      case "herramientas":
        return <Herramientas />;
      case "perfil":
        return <PerfilUsuario usuario={usuarioAutenticado} />;
      default:
        return <p>Vista no válida</p>;
    }
  };

  return (
    <>
      <BarraNavegacion setVista={setVistaActual} cerrarSesion={cerrarSesion} />
      <div className="contenedor-pagina">
        {renderizarContenido()}
      </div>
    </>
  );
}

export default App;
