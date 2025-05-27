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
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Nuevo estado

  const usuario = JSON.parse(localStorage.getItem("usuario")); // obtener ID del usuario logueado

  useEffect(() => { // Obtener las fechas de entrenamiento del mes seleccionado
    if (usuario) {
      const primerDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth(), 1); // Primer día del mes seleccionado
      const ultimoDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 0); // Último día del mes seleccionado
      
        const fecha_inicio = formatearFechaLocal(primerDiaDelMes);
        const fecha_fin = formatearFechaLocal(ultimoDiaDelMes);

      fetch("http://localhost/app-gimnasio/educafit-app/backend/obtenerEntrenamientos.php", { // Obtener las fechas de entrenamiento del usuario
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
          }
        });
    }
  }, [fechaSeleccionada, usuario])
  
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
        {infoEntrenamiento ? (
            <div className="info-entrenamiento">
                <h3>Entrenamiento del {fechaSeleccionada.toLocaleDateString()}</h3>
                <p>
                    <strong>Series:</strong> {infoEntrenamiento.series}
                </p>
                <p>
                    <strong>Repeticiones:</strong> {infoEntrenamiento.repeticiones_por_serie}
                </p>
                <p>
                    <strong>Peso utilizado:</strong> {infoEntrenamiento.peso_utilizado} kg
                </p>
                <p>
                    <strong>Peso total levantado:</strong> {infoEntrenamiento.peso_total_levantado} kg
                </p>
                {infoEntrenamiento.notas && (
                    <p>
                        <strong>Notas:</strong> {infoEntrenamiento.notas}
                    </p>
                )}
            </div>
        ) : (
            // Mostrar mensaje y botón antes del formulario
            fechaSeleccionada <= new Date().setHours(23,59,59,999) && (
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
                        onEntrenamientoGuardado={() => {
                            setInfoEntrenamiento(null);
                            setEntrenamientosCache({});
                            setMostrarFormulario(false);
                        }}
                    />
                )
            )
        )}
    </div>
);
}
