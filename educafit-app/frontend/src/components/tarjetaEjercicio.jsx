import React from "react";
import "./TarjetaEjercicio.css";

// Pequeño componente para mostrar una tarjeta de ejercicio con su título e imagen al seleccionar una categoría/buscar un ejercicio específico

export default function TarjetaEjercicio({ ejercicio, onClick }) {
  return (
    <div className="tarjeta-ejercicio" onClick={onClick}>
      <div className="miniatura">
        <img src={ejercicio.imagen} alt={ejercicio.nombre} />
      </div>
      <div className="titulo-ejercicio">{ejercicio.nombre}</div>
    </div>
  );
}
