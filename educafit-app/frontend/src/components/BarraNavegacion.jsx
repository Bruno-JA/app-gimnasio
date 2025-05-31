import React, { useEffect, useRef, useState } from 'react';
import './BarraNavegacion.css';

export default function BarraNavegacion({ setVista, cerrarSesion }) {
  const [vistaActiva, setVistaActiva] = useState("inicio");
  const [posicionSelector, setPosicionSelector] = useState({ left: 0, width: 0 });
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  const navRef = useRef();
  const menuRef = useRef(null);

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    function manejarClickFuera(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMostrarMenuUsuario(false);
      }
    }
    document.addEventListener('mousedown', manejarClickFuera);
    return () => document.removeEventListener('mousedown', manejarClickFuera);
  }, []);

  const actualizarSelector = (nombreVista) => {
    setVista(nombreVista);
    setVistaActiva(nombreVista);
    setMostrarMenuUsuario(false); // Cerrar el menú al cambiar de vista

    const botones = navRef.current.querySelectorAll('button');
    const boton = Array.from(botones).find(btn => btn.dataset.vista === nombreVista);
    if (boton) {
      setPosicionSelector({ left: boton.offsetLeft, width: boton.offsetWidth });
    }

    if (nombreVista === "perfil" || nombreVista === "ajustes") {
      // Ocultar el fondo animado de los botones al hacer clic en "Perfil de usuario" o "Ajustes" dentro del menú desplegable
      setPosicionSelector({ left: 0, width: 0 });
    }
  };

  useEffect(() => { // Inicializar el selector en la vista "inicio"
    actualizarSelector(vistaActiva);
    const handleResize = () => actualizarSelector(vistaActiva);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="barra-navegacion">
      <div className="logo">EducaFit</div>
      <nav ref={navRef}>
        <div
          className="selector"
          style={{
            left: `${posicionSelector.left}px`,
            width: `${posicionSelector.width}px`,
          }}
        ></div>
        <button
          data-vista="inicio"
          className={vistaActiva === "inicio" ? "activo" : ""}
          onClick={() => actualizarSelector("inicio")}
        >
          Inicio
        </button>
        <button
          data-vista="educafit"
          className={vistaActiva === "educafit" ? "activo" : ""}
          onClick={() => actualizarSelector("educafit")}
        >
          Educafit
        </button>
        <button
          data-vista="herramientas"
          className={vistaActiva === "herramientas" ? "activo" : ""}
          onClick={() => actualizarSelector("herramientas")}
        >
          Herramientas
        </button>
        <div
          className={`usuario-menu ${mostrarMenuUsuario ? "activo" : ""}`}
          ref={menuRef}
        >
          <button
            onClick={() => setMostrarMenuUsuario((prev) => !prev)}
            className={mostrarMenuUsuario ? "boton-usuario-activo" : ""}
          >
            Usuario
          </button>
          <div
            className={`menu-desplegable ${
              mostrarMenuUsuario ? "visible" : ""
            }`}
          >
            <button onClick={() => actualizarSelector("perfil")}>
              Perfil de usuario
            </button>
            <button onClick={() => actualizarSelector("ajustes")}>
              Ajustes
            </button>
            <button onClick={cerrarSesion}>Cerrar sesión</button>
          </div>
        </div>
      </nav>
    </div>
  );
}
