import React from "react";
import "./TarjetaEjercicio.css";

export default function TarjetaEjercicio({ ejercicio, onClick }) {
  return (
    <div className="tarjeta-ejercicio" onClick={onClick}>
      <div className="miniatura">
        {ejercicio.imagen ? (
          <img src={ejercicio.imagen} alt={ejercicio.nombre} />
        ) : (
          <div className="sin-imagen">
            <span>Sin imagen</span>
          </div>
        )}
      </div>
      <div className="titulo-ejercicio">{ejercicio.nombre}</div>
    </div>
  );
}
