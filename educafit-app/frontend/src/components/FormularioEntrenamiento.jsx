import { useState } from "react";
import { formatearFechaLocal } from '../helpers/fechas'; //

export default function FormularioEntrenamiento({ 
  fecha, 
  usuarioId, 
  onEntrenamientoGuardado, 
  entrenamientoPrevio = null,
  entrenamientoExistente = false,
  onCancelar = () => {},
  enEdicion = false 
}) {
  const [series, setSeries] = useState(entrenamientoPrevio?.series || '');
  const [repeticiones, setRepeticiones] = useState(entrenamientoPrevio?.repeticiones_por_serie || '');
  const [peso, setPeso] = useState(entrenamientoPrevio?.peso_utilizado || '');
  const [notas, setNotas] = useState(entrenamientoPrevio?.notas || '');
  const [mensaje, setMensaje] = useState('');


const manejarEnvio = async (e) => {
  e.preventDefault();
  setMensaje('');

  const fechaNormalizada = formatearFechaLocal(new Date(fecha));
  const url = enEdicion
    ? "http://localhost/app-gimnasio/educafit-app/backend/actualizarEntrenamiento.php"
    : "http://localhost/app-gimnasio/educafit-app/backend/guardarEntrenamiento.php";

  const res = await fetch(url, {
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
  });

  const data = await res.json();

  if (data.success) {
    setMensaje(enEdicion ? "Entrenamiento actualizado correctamente." : "Entrenamiento guardado correctamente.");

    setTimeout(async () => {
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
      const entrenamientoActualizado = respuesta.success ? respuesta.entrenamiento : null;

      if (onEntrenamientoGuardado) {
        onEntrenamientoGuardado(entrenamientoActualizado);
      }
    }, 2000);
  } else {
    setMensaje("Error al guardar el entrenamiento.");
  }
};


  return (
    <form onSubmit={manejarEnvio} className="formulario-entrenamiento">
      <h3>{entrenamientoExistente ? 'Editar' : 'Registrar'} entrenamiento del {new Date(fecha).toLocaleDateString()}</h3>

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

      <button type="submit">{entrenamientoExistente ? 'Guardar cambios' : 'Guardar entrenamiento'}</button>
      <button type="button" onClick={onCancelar} style={{ marginLeft: '1rem' }}>
        Cancelar
      </button>
      {/* botón para cancelar la edición o registro del entrenamiento */}
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}
