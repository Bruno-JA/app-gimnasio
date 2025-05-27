import { useState } from "react";
import { formatearFechaLocal } from '../helpers/fechas';

export default function FormularioEntrenamiento({ fecha, usuarioId, onGuardar }) {
  const [series, setSeries] = useState('');
  const [repeticiones, setRepeticiones] = useState('');
  const [peso, setPeso] = useState('');
  const [nota, setNota] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje('');

    const fechaNormalizada = formatearFechaLocal(new Date(fecha));

    const res = await fetch("http://localhost/app-gimnasio/educafit-app/backend/guardarEntrenamiento.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario_id: usuarioId,
        fecha: fechaNormalizada,
        series,
        repeticiones_por_serie: repeticiones,
        peso_utilizado: peso,
        notas: nota
      })
    });

    const data = await res.json();
    if (data.success) {
      setMensaje("Entrenamiento guardado correctamente.");
      onGuardar(); // actualizar calendario y caché
    } else {
      setMensaje("Error al guardar el entrenamiento.");
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario-entrenamiento">
      <h3>Registrar entrenamiento del {new Date(fecha).toLocaleDateString()}</h3>
      <input
        type="number"
        placeholder="Series"
        value={series}
        onChange={(e) => setSeries(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Repeticiones por serie"
        value={repeticiones}
        onChange={(e) => setRepeticiones(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Peso utilizado (kg)"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Tipo de entrenamiento / nota"
        value={nota}
        onChange={(e) => setNota(e.target.value)}
      />
      <button type="submit">Guardar entrenamiento</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}
