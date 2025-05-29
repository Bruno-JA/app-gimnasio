import React from 'react';
import './BarraNavegacion.css'; // Asegúrate de que esté en la misma carpeta o ajusta la ruta

export default function BarraNavegacion({ setVista }) {
  return (
    <div className="barra-navegacion">
      <div className="logo">EducaFit</div>
      <nav>
        <button onClick={() => setVista('inicio')}>Inicio</button>
        <button onClick={() => setVista('educafit')}>Educafit</button>
        <button onClick={() => setVista('herramientas')}>Herramientas</button>
        <button onClick={() => setVista('usuario')}>Usuario</button>
      </nav>
    </div>
  );
}
