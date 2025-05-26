import { useEffect, useState } from 'react';
import Login from './components/Login';
import Registro from './components/Registro';

function App() {
  const [usuario, setUsuario] = useState(null);

  // Leer del localStorage cuando carga la app
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  // Cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  // Mostrar formulario de login si no está autenticado
  if (!usuario) {
    return (
      <div>
        <Login onLoginSuccess={setUsuario} />
        <hr />
        <Registro />
      </div>
    );
  }

  // Si está logueado, mostrar app principal
  return (
    <div>
      <h1>Bienvenido, {usuario.nombre}</h1>
      <p>Tu usuario es: {usuario.nombre_usuario}</p>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
      {/* Aquí iría el resto de la app */}
    </div>
  );
}

export default App;
