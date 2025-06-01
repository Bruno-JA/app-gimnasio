import React, { useState, useRef, useEffect } from "react";
import "./Educafit.css";
import TarjetaEjercicio from "./tarjetaEjercicio"; // tarjetas con la información de los ejercicios

export default function Educafit() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("pecho");
  const [sombraBusqueda, setSombraBusqueda] = useState(false); // Estado para la sombra de la barra de búsqueda al hacer scroll
  const ventanaContenidoRef = useRef(null); // Referencia al contenedor principal para manejar el scroll
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const categorias = [
    { id: "pecho", nombre: "Entrenamientos de pecho" },
    { id: "piernas", nombre: "Entrenamientos de piernas" },
    { id: "espalda", nombre: "Entrenamientos de espalda" },
    { id: "hombros", nombre: "Entrenamientos de hombros" },
    { id: "brazos", nombre: "Entrenamientos de brazos" },
    { id: "core", nombre: "Entrenamientos de core" },
    { id: "favoritos", nombre: "Entrenamientos favoritos ⭐" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = ventanaContenidoRef.current?.scrollTop;
      setSombraBusqueda(scrollTop > 0);
    };

    const ref = ventanaContenidoRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (ref) {
        ref.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="educafit-contenedor">
      <aside className="menu-lateral">
        <div className="saludo-usuario">
          <p>Hola, {usuario?.nombre || "usuario"}</p>
        </div>
        <nav className="lista-categorias">
          {categorias.map((categoria) => (
            <React.Fragment key={categoria.id}>
              {categoria.id === "favoritos" && <hr className="separador-categorias" />}
              <button
                className={categoriaSeleccionada === categoria.id ? "activa" : ""}
                onClick={() => setCategoriaSeleccionada(categoria.id)}
              >
                {categoria.nombre}
              </button>
            </React.Fragment>
          ))}
        </nav>
      </aside>

      <main className="ventana-contenido" ref={ventanaContenidoRef}>
        <div className={`barra-busqueda ${sombraBusqueda ? "sombra" : ""}`}>
          <input
            type="text"
            placeholder="Buscar ejercicio..."
            className="input-busqueda"
          />
        </div>

        <div className="contenido-ejercicios">
          {/* Aquí irán las tarjetas de los ejercicios según la categoría seleccionada */}
          <TarjetaEjercicio
            titulo="Press de banca"
            imagen="/src/assets/_7db04198-01f0-4c06-a59d-b7f38ea9ec9f.jpg" // Reemplazar con la ruta correcta de la imagen
          />
          <TarjetaEjercicio
            titulo="Press de banca"
            imagen="/src/assets/_7db04198-01f0-4c06-a59d-b7f38ea9ec9f.jpg" // Reemplazar con la ruta correcta de la imagen
          />
          <TarjetaEjercicio
            titulo="Press de banca"
            imagen="/src/assets/_7db04198-01f0-4c06-a59d-b7f38ea9ec9f.jpg" // Reemplazar con la ruta correcta de la imagen
          />
          <TarjetaEjercicio
            titulo="Press de banca"
            imagen="/src/assets/_7db04198-01f0-4c06-a59d-b7f38ea9ec9f.jpg" // Reemplazar con la ruta correcta de la imagen
          />
          <TarjetaEjercicio
            titulo="Press de banca"
            imagen="/src/assets/_7db04198-01f0-4c06-a59d-b7f38ea9ec9f.jpg" // Reemplazar con la ruta correcta de la imagen
          />
          <TarjetaEjercicio
            titulo="Press de banca"
            imagen="/src/assets/_7db04198-01f0-4c06-a59d-b7f38ea9ec9f.jpg" // Reemplazar con la ruta correcta de la imagen
          />
          <TarjetaEjercicio
            titulo="Press de banca"
            imagen="/src/assets/_7db04198-01f0-4c06-a59d-b7f38ea9ec9f.jpg" // Reemplazar con la ruta correcta de la imagen
          />
        </div>
      </main>
    </div>
  );
}
