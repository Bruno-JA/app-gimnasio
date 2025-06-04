import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarioEntrenamiento.css';

export default function CalendarioEntrenamiento() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [fechasConEntrenamiento, setFechasConEntrenamiento] = useState([]);

  const usuario = JSON.parse(localStorage.getItem("usuario")); // obtener ID del usuario logueado

  useEffect(() => {
    if (usuario) {
      const primerDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth(), 1);
      const ultimoDiaDelMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 0);

      const fecha_inicio = primerDiaDelMes.toISOString().split('T')[0];
      const fecha_fin = ultimoDiaDelMes.toISOString().split('T')[0];

      console.log(fecha_inicio, fecha_fin);

      // Llamada al backend para obtener las fechas con entrenamiento del mes seleccionado
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
          }
        });
    }
  }, [fechaSeleccionada, usuario]);

  // Función para añadir 🏋️‍♀️ si hay entrenamiento en ese día
  const renderEmoji = ({ date, view }) => {
    if (view !== 'month') return null;
    const fechaISO = date.toISOString().split('T')[0];
    return fechasConEntrenamiento.includes(fechaISO) ? (
      <div style={{ textAlign: "center", fontSize: "1rem" }}>🏋️‍♀️</div>
    ) : (
      <div style={{ textAlign: "center", fontSize: "1rem" }}>🔴</div>
    );
  };

  return (
    <div className="calendario-contenedor">
      <h2>Calendario de Entrenamientos</h2>
      <Calendar
        onChange={setFechaSeleccionada}
        value={fechaSeleccionada}
        locale="es-ES"
        tileContent={renderEmoji}
      />
      <p style={{ marginTop: "1rem" }}>
        Día seleccionado: {fechaSeleccionada.toLocaleDateString()}
      </p>
    </div>
  );
}
