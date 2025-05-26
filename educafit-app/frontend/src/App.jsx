import { useEffect, useState } from 'react';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost/app-gimnasio/educafit-app/backend/getUsuario.php?nombre_usuario=usuario_demo")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setUsuario(data);
        }
      })
      .catch((err) => {
        setError("Error al conectar con el servidor");
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Prueba de conexión con la BBDD</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {usuario ? (
        <pre>{JSON.stringify(usuario, null, 2)}</pre>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}

export default App;
