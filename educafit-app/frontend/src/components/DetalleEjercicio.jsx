import React from 'react';
import './DetalleEjercicio.css';

export default function DetalleEjercicio({ ejercicio, onVolver }) {
  if (!ejercicio) return null;

  return (
    <div className="detalle-ejercicio">
      <button className="volver" onClick={onVolver}>
        ← Volver
      </button>
      <h2>{ejercicio.nombre}</h2>

      {ejercicio.imagen && (
        <div className="imagen-ejercicio">
          <img src={ejercicio.imagen} alt={ejercicio.nombre} />
        </div>
      )}

      <div className="info-ejercicio">
        <p>
          <strong>Grupo principal:</strong> {ejercicio.grupo_principal}
        </p>
        <p>
          <strong>Grupos secundarios:</strong>{' '}
          {ejercicio.grupos_secundarios?.join(', ') || 'N/A'}
        </p>
        <p>
          <strong>Equipamiento:</strong> {ejercicio.equipamiento || 'Ninguno'}
        </p>
        <p>
          <strong>Instrucciones:</strong>
        </p>
        <div
          className="descripcion-html"
          dangerouslySetInnerHTML={{ __html: ejercicio.instrucciones }}
        ></div>
      </div>
    </div>
  );
}
