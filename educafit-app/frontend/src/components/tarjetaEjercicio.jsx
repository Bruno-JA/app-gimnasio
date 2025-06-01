import React from "react";
import "./TarjetaEjercicio.css";

// Pequeño componente para mostrar una tarjeta de ejercicio con su título e imagen al seleccionar una categoría/buscar un ejercicio específico

export default function TarjetaEjercicio({ titulo, imagen }) {
  return (
    <div className="tarjeta-ejercicio">
      <div className="miniatura">
        <img src={imagen} alt={titulo} />
      </div>
      <div className="titulo-ejercicio">{titulo}</div>
    </div>
  );
}
