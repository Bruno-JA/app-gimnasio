import React, { useEffect, useRef, useState } from 'react';
import './BarraNavegacion.css';
// Iconos de react-icons para los botones de navegación
import { FaCalendar, FaBookOpen, FaTools, FaUser } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
export default function BarraNavegacion({ setVista, cerrarSesion }) {
  const [vistaActiva, setVistaActiva] = useState("inicio");
  const [posicionSelector, setPosicionSelector] = useState({ left: 0, width: 0 });
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  const navRef = useRef();
  const menuRef = useRef(null);


  const nombresVentanas = {
  inicio: "Calendario Fit",
  educafit: "EducaFit",
  herramientas: "Herramientas",
  perfil: "Perfil de usuario",
};
// map escalable de nombres de ventanas para cambiar el título de la ventana según la vista activa
 

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

  const posicionarSelector = (nombreVista) => {
    const botones = navRef.current.querySelectorAll('button');
    const boton = Array.from(botones).find(btn => btn.dataset.vista === nombreVista);
    if (boton) {
      setPosicionSelector({ left: boton.offsetLeft, width: boton.offsetWidth });
    }
  };

  const actualizarSelector = (nombreVista) => {
    const vistasSinSelector = ["perfil"];
    // Array escalable de vistas que no deben mostrar el selector
    setVista(nombreVista);
    setVistaActiva(nombreVista);
    setMostrarMenuUsuario(false); // Cerrar el menú al cambiar de vista

    const botones = navRef.current.querySelectorAll('button');
    const boton = Array.from(botones).find(btn => btn.dataset.vista === nombreVista);
    if (boton) {
      setPosicionSelector({ left: boton.offsetLeft, width: boton.offsetWidth });
    }

    if (vistasSinSelector.includes(nombreVista)) {
      // Ocultar el fondo animado de los botones al hacer clic en un botón dentro del menú desplegable.
      setPosicionSelector({ left: 0, width: 0 });
    }
  };

  // Inicializar el selector en la vista activa al cargar el componente
  useEffect(() => {
    posicionarSelector(vistaActiva);
    const ajustarSelectorAlRedimensionar = () => posicionarSelector(vistaActiva);
    window.addEventListener('resize', ajustarSelectorAlRedimensionar);
    return () => window.removeEventListener('resize', ajustarSelectorAlRedimensionar);
  }, [vistaActiva]);

  return (
    <div className="barra-navegacion">
      {/* Al pulsar sobre el logo, se renderiza la vista de inicio */}
      <div className="cabecera">
        <img
          src="/frontend/src/assets/logo_app_fitness.png"
          alt="Logo-fit"
          className="logo"
          onClick={() => actualizarSelector("inicio")}
        />
        <span>{nombresVentanas[vistaActiva] || "Aplicación"}</span>
        {/* Cambia el nombre de la cabecera dependiendo de la vista activa */}
      </div>
      <nav ref={navRef}>
        <div
          className="selector"
          style={{
            left: `${posicionSelector.left}px`,
            width: `${posicionSelector.width}px`,
          }}
        ></div>
        <div className="botones-navegacion">
          <button
            data-vista="inicio"
            className={vistaActiva === "inicio" ? "activo" : ""}
            onClick={() => actualizarSelector("inicio")}
          >
            <FaCalendar className="icono-inicio" />
          </button>
          <button
            data-vista="educafit"
            className={vistaActiva === "educafit" ? "activo" : ""}
            onClick={() => actualizarSelector("educafit")}
          >
            <FaBookOpen className="icono-educafit" />
          </button>
          <button
            data-vista="herramientas"
            className={vistaActiva === "herramientas" ? "activo" : ""}
            onClick={() => actualizarSelector("herramientas")}
          >
            <FaTools className="icono-herramientas" />
          </button>
          <div
            className={`usuario-menu ${mostrarMenuUsuario ? "activo" : ""}`}
            ref={menuRef}
          >
            <button
              onClick={() => setMostrarMenuUsuario((prev) => !prev)}
              className={mostrarMenuUsuario ? "boton-usuario-activo" : ""}
            >
              <FaUser className="icono-usuario" />
              <IoIosArrowDown
                className={`icono-flecha-usuario ${mostrarMenuUsuario ? "pulsado" : ""}`}
              />
              {}
            </button>
            <div
              className={`menu-desplegable ${mostrarMenuUsuario ? "visible" : ""}`}
            >
              <button onClick={() => actualizarSelector("perfil")}>
                Perfil de usuario
              </button>
              <button onClick={cerrarSesion}>Cerrar sesión</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
