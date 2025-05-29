import { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // componente de calendario
import 'react-calendar/dist/Calendar.css';
import './CalendarioEntrenamiento.css';
import FormularioEntrenamiento from './FormularioEntrenamiento';
import { formatearFechaLocal } from '../helpers/fechas'; // Importa la función para formatear fechas


export default function CalendarioEntrenamiento() {

  const [entrenamientosCache, setEntrenamientosCache] = useState({});
  // Estado para almacenar la fecha seleccionada y las fechas con entrenamiento, evitando llamar al backend en bucle
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date()); // Fecha actual como valor inicial
  const [fechasConEntrenamiento, setFechasConEntrenamiento] = useState([]); // Array para almacenar las fechas con entrenamiento
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para mostrar u ocultar el formulario de entrenamiento
  const [mesConsultado, setMesConsultado] = useState(null); // Estado para almacenar el mes consultado
  const [modoEdicion, setModoEdicion] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario")); // obtener ID del usuario logueado

  // Efecto para obtener las fechas con entrenamiento del mes seleccionado
useEffect(() => {
  if (!usuario) return;

  const año = fechaSeleccionada.getFullYear();
  const mes = fechaSeleccionada.getMonth();
  const claveMes = `${año}-${mes}`; // Clave única para el mes (año-mes)

  // Evita repetir la petición si ya consultamos este mes
  if (mesConsultado === claveMes) return;

  const primerDiaDelMes = new Date(año, mes, 1);
  const ultimoDiaDelMes = new Date(año, mes + 1, 0);

  const fecha_inicio = formatearFechaLocal(primerDiaDelMes);
  const fecha_fin = formatearFechaLocal(ultimoDiaDelMes);

  fetch("http://localhost/app-gimnasio/educafit-app/backend/obtenerEntrenamientos.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario_id: usuario.id,
      fecha_inicio,
      fecha_fin
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setFechasConEntrenamiento(data.fechas_entrenamiento);
        setMesConsultado(claveMes); // Marcamos que ya hemos consultado este mes para evitar repetir la petición
      }
    });
}, [fechaSeleccionada, usuario]);

  
  const [infoEntrenamiento, setInfoEntrenamiento] = useState(null);


useEffect(() => {
  if (!usuario) return;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (fechaSeleccionada > hoy) {
    setInfoEntrenamiento(null);
    return;
  }

  const fecha = formatearFechaLocal(fechaSeleccionada);

  // Si ya está en la caché, usamos lo que tenemos
  if (entrenamientosCache[fecha]) {
    setInfoEntrenamiento(entrenamientosCache[fecha]);
    return;
  }

  // Si no está en la caché, lo pedimos al servidor
  fetch("http://localhost/app-gimnasio/educafit-app/backend/entrenamientoPorFecha.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario_id: usuario.id,
      fecha
    })
  })
    .then(res => res.json())
    .then(data => {
      const info = data.success ? data.entrenamiento : null;

      // Actualiza estado con la nueva info
      setInfoEntrenamiento(info);

      // Almacena en caché
      setEntrenamientosCache(prev => ({
        ...prev,
        [fecha]: info
      }));
    });
}, [fechaSeleccionada]);

const eliminarEntrenamiento = async () => {
  const fecha = formatearFechaLocal(fechaSeleccionada);
  const confirmar = window.confirm(`¿Seguro que deseas eliminar el entrenamiento del ${fechaSeleccionada.toLocaleDateString()}?`);
  if (!confirmar) return;

  const res = await fetch("http://localhost/app-gimnasio/educafit-app/backend/eliminarEntrenamiento.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario_id: usuario.id,
      fecha
    })
  });

  const data = await res.json();

  if (data.success) {
    setInfoEntrenamiento(null);
    setMostrarFormulario(false);

    // Eliminar de la caché
    setEntrenamientosCache(prev => {
      const copia = { ...prev };
      delete copia[fecha];
      return copia;
    });

    // Eliminar del listado de fechas con entrenamiento (para quitar el emoji)
    setFechasConEntrenamiento(prev => prev.filter(f => f !== fecha));
  } else {
    alert("No se pudo eliminar el entrenamiento.");
  }
};


  // Función para añadir 🏋️‍♀️ si hay entrenamiento en ese día
function renderEmoji({ date, view }) {
    if (view !== "month") return null;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Normalizar la hora
    const fechaLocal = formatearFechaLocal(date);

    // Si la fecha es futura, no mostrar nada
    if (date > hoy) return null;

    return fechasConEntrenamiento.includes(fechaLocal) ? (
        <div style={{ textAlign: "center", fontSize: "1rem" }}>🏋️‍♀️</div>
    ) : (
        <div style={{ textAlign: "center", fontSize: "1rem" }}>🔴</div>
    );
}

return (
  <div className="calendario-contenedor">
    <h2>Calendario de Entrenamientos</h2>
    <Calendar
      onChange={setFechaSeleccionada}
      value={fechaSeleccionada}
      locale="es-ES"
      tileContent={renderEmoji}
      maxDate={new Date()} // No permitir seleccionar fechas futuras
    />
    <p style={{ marginTop: "1rem" }}>
      Día seleccionado: {fechaSeleccionada.toLocaleDateString()}
    </p>

    {infoEntrenamiento && !modoEdicion ? (
      <div className="info-entrenamiento">
        <h3>Entrenamiento del {fechaSeleccionada.toLocaleDateString()}</h3>
        <p><strong>Series:</strong> {infoEntrenamiento.series}</p>
        <p><strong>Repeticiones:</strong> {infoEntrenamiento.repeticiones_por_serie}</p>
        <p><strong>Peso utilizado:</strong> {infoEntrenamiento.peso_utilizado} kg</p>
        <p><strong>Peso total levantado:</strong> {infoEntrenamiento.peso_total_levantado} kg</p>
        {infoEntrenamiento.notas && (
          <p><strong>Notas:</strong> {infoEntrenamiento.notas}</p>
        )}
        <button style={{ marginTop: "1rem" }} onClick={() => setModoEdicion(true)}>
          Editar entrenamiento
        </button>
        <button style={{ marginTop: "1rem" }} onClick={eliminarEntrenamiento}>
          Eliminar entrenamiento
        </button>
      </div>
    ) : null}

    {modoEdicion && (
      <FormularioEntrenamiento
        fecha={fechaSeleccionada}
        usuarioId={usuario?.id}
        entrenamientoPrevio={infoEntrenamiento}
        enEdicion={true}
        onEntrenamientoGuardado={(entrenamientoActualizado) => {
          const fecha = formatearFechaLocal(fechaSeleccionada);
          setEntrenamientosCache(prev => ({
            ...prev,
            [fecha]: entrenamientoActualizado
          }));
          setInfoEntrenamiento(entrenamientoActualizado);
          setModoEdicion(false);
          setMostrarFormulario(false);
        }}
      />
    )}

    {!infoEntrenamiento && !modoEdicion && fechaSeleccionada <= new Date().setHours(23, 59, 59, 999) && (
      !mostrarFormulario ? (
        <div style={{ marginTop: "1rem" }}>
          <p>No existe ningún entrenamiento para este día.</p>
          <button onClick={() => setMostrarFormulario(true)}>
            Añadir entrenamiento
          </button>
        </div>
      ) : (
        <FormularioEntrenamiento
          fecha={fechaSeleccionada}
          usuarioId={usuario?.id}
          onEntrenamientoGuardado={(nuevoEntrenamiento) => {
            const fecha = formatearFechaLocal(fechaSeleccionada);

            // Actualizar la caché con el nuevo entrenamiento añadido
            setFechasConEntrenamiento(prev => {
              const fechaFormateada = formatearFechaLocal(fechaSeleccionada);
              return prev.includes(fechaFormateada) ? prev : [...prev, fechaFormateada];
            });

            setEntrenamientosCache(prev => ({
              ...prev,
              [fecha]: nuevoEntrenamiento
            }));
            setInfoEntrenamiento(nuevoEntrenamiento);
            setMostrarFormulario(false);
          }}
        />
      )
    )}
  </div>
);

}