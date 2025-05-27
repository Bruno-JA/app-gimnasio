import { useState } from "react";
import { formatearFechaLocal } from '../helpers/fechas'; //

export default function FormularioEntrenamiento({ fecha, usuarioId, onEntrenamientoGuardado }) {
  const [series, setSeries] = useState('');
  const [repeticiones, setRepeticiones] = useState('');
  const [peso, setPeso] = useState('');
  const [notas, setNotas] = useState('');
  const [mensaje, setMensaje] = useState('');

const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje('');

    const fechaNormalizada = formatearFechaLocal(new Date(fecha));

    const res = await fetch(
        "http://localhost/app-gimnasio/educafit-app/backend/guardarEntrenamiento.php",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usuario_id: usuarioId,
                fecha: fechaNormalizada,
                series,
                repeticiones_por_serie: repeticiones,
                peso_utilizado: peso,
                notas,
            }),
        }
    );

    const data = await res.json();

    if (data.success) {
        setMensaje("Entrenamiento guardado correctamente.");

        setTimeout(async () => {
            // Solicita el entrenamiento recién añadido
            const consulta = await fetch(
                "http://localhost/app-gimnasio/educafit-app/backend/entrenamientoPorFecha.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        usuario_id: usuarioId,
                        fecha: fechaNormalizada,
                    }),
                }
            );

            const respuesta = await consulta.json();
            const nuevoEntrenamiento = respuesta.success
                ? respuesta.entrenamiento
                : null;

            if (onEntrenamientoGuardado)
                onEntrenamientoGuardado(nuevoEntrenamiento); // pasa la info actualizada
        }, 2000);
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
        placeholder="Notas (opcional)"
        value={notas}
        onChange={(e) => setNotas(e.target.value)}
      />
      <button type="submit">Guardar entrenamiento</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}
