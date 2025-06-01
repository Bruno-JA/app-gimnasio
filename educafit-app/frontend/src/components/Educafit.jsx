//TODO: Añadir una categoría de "todos" para poder buscar todos los ejercicios sin importar la categoría
import React, { useState } from "react";
import "./Educafit.css";
import TarjetaEjercicio from "./TarjetaEjercicio";
import DetalleEjercicio from "./DetalleEjercicio";

export default function Educafit() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("pecho");
  const [busqueda, setBusqueda] = useState("");
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const categorias = [
    { id: "pecho", nombre: "Pecho" },
    { id: "piernas", nombre: "Piernas" },
    { id: "espalda", nombre: "Espalda" },
    { id: "hombros", nombre: "Hombros" },
    { id: "brazos", nombre: "Brazos" },
    { id: "core", nombre: "Core" },
    { id: "favoritos", nombre: "Favoritos ⭐" }
  ];

  // Datos de ejemplo de ejercicios
  const ejercicios = [
    {
      id: 1,
      nombre: "Press de banca",
      grupo_principal: "Pecho",
      grupos_secundarios: ["Tríceps", "Hombros"],
      equipamiento: "Barra",
      instrucciones: ["Acuéstate en el banco...", "Baja la barra lentamente..."],
      imagen: "https://via.placeholder.com/300x150.png?text=Press+Banca"
    },
    {
      id: 2,
      nombre: "Sentadillas",
      grupo_principal: "Piernas",
      grupos_secundarios: ["Glúteos", "Core"],
      equipamiento: "Ninguno",
      instrucciones: ["Ponte de pie con los pies separados...", "Baja lentamente como si te sentaras..."],
      imagen: "https://via.placeholder.com/300x150.png?text=Sentadillas"
    }
    // Agrega más según lo necesites
  ];

  const ejerciciosFiltrados = ejercicios.filter(ej => // 
    // implementación inicial para filtrar entre las categorías básicas que se muestran en el menú lateral
    ej.grupo_principal.toLowerCase().includes(categoriaSeleccionada.toLowerCase())
    // implementación inicial para filtrar entre los ejercicios que se muestran al buscar un ejercicio específico dentro de la categoría seleccionada.
    && ej.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

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
                onClick={() => {
                  setCategoriaSeleccionada(categoria.id);
                  setEjercicioSeleccionado(null); // Reset al cambiar de categoría
                }}
              >
                {categoria.nombre}
              </button>
            </React.Fragment>
          ))}
        </nav>
      </aside>

      <main className="ventana-contenido">
        <div className="barra-busqueda">
          <input
            type="text"
            placeholder="Buscar ejercicio..."
            className="input-busqueda"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {ejercicioSeleccionado ? (
          <DetalleEjercicio
            ejercicio={ejercicioSeleccionado}
            onVolver={() => setEjercicioSeleccionado(null)}
          />
        ) : (
          <div className="contenido-ejercicios">
            {ejerciciosFiltrados.map((ejercicio) => (
              <TarjetaEjercicio
                key={ejercicio.id}
                ejercicio={ejercicio}
                onClick={() => setEjercicioSeleccionado(ejercicio)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
